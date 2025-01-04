import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { razorpayOptions } from "@/store/shop/order-slice";

function PaymentReturnPage({ onPaymentOptionSelected }) {
  const [paymentMethod, setPaymentMethod] = useState("");

  function handlePaymentSubmit() {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    onPaymentOptionSelected(paymentMethod);
  }
  
  const razorpayOption = {
    key: "RAZORPAY_KEY_ID",
    amount: totalAmount * 100,
    currency: "INR",
    name: "Your Store",
    description: "Order Payment",
    order_id: razorpayOrderId,
    handler: async function (response) {
      const paymentData = {
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
        orderId: backendOrderId,
      };
      await axios.post("/api/payment/verify-payment", paymentData);
    },
  };
  
  const rzp = new Razorpay(razorpayOption);
  rzp.open();

  return (
    <div>
      <h2>Select Payment Method</h2>
      <div>
        <label>
          <input
            type="radio"
            value="creditCard"
            checked={paymentMethod === "creditCard"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Credit/Debit Card
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>
      </div>
      <button onClick={handlePaymentSubmit}>Proceed</button>
      <Card>
        <CardHeader>
          <CardTitle>Processing Payment...Please wait!</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

export default PaymentReturnPage;