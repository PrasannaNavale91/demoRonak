import Address from "@/components/shopping-view/address";
import img from "../../assets/account.webp";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createNewOrder, capturePayment } from "@/store/shop/order-slice";
import { useToast } from "@/hooks/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(currentSelectedAddress, "cartItems");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpayScript();
  })

  async function handleInitiateRazorpayPayment() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }
  
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };
  
    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        initiateRazorpayPayment(data?.payload?.orderId);
      } else {
        setIsPaymemntStart(false);
      }
    });
  
    const { payload } = await dispatch(createNewOrder(orderData));

    if (payload?.success) {
      const { razorpayOrderId, amount, currency } = payload;
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: totalCartAmount * 100,
        currency: currency,
        name: "E-commerce",
        description: "Test Transaction",
        order_id: razorpayOrderId,
        handler: async function (response) {
          const paymentVerificationData = {
            razorpayOrderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            orderId: payload.orderId,
          };

          await dispatch(verifyPayment(paymentVerificationData));
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: currentSelectedAddress?.phone,
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else {
      toast({
        title: "Payment initiation failed!",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} alt="checkout-img" className="h-full w-full object-cover object-center" loading="lazy" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiateRazorpayPayment} className="w-full">
              {isPaymentStart
                ? "Processing Payment..."
                : "Checkout with Razorpay"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;