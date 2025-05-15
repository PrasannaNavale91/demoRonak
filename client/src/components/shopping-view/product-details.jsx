import { HeartIcon, ShoppingCartIcon, StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist, } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState, useRef } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { wishlistItems } = useSelector((state) => state.shopWishlist);
  const { reviews } = useSelector((state) => state.shopReview);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [MatchedVariant, setMatchedVariant] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const zoomRef = useRef(null);

  const { toast } = useToast();

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");

    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  // function handleAddToWishlist(getCurrentProductId) {
  //   let getWishlistItems = wishlistItems.items || [];

  //   if (getWishlistItems.length) {
  //     const indexOfCurrent = getWishlistItems.findIndex(
  //       (item) => item.productId === getCurrentProductId
  //     );
  //     if (indexOfCurrent > -1) {
  //       const getProduct = getWishlistItems[indexOfCurrent].itemFav;
  //       if (getProduct + 1 > getTotalStock) {
  //         toast({
  //           title: `Only ${getProduct} can be added for this item`,
  //           variant: "destructive",
  //         });

  //         return;
  //       }
  //     }
  //   }
  //   dispatch(
  //     addToWishlist({
  //       userId: user?.id,
  //       productId: getCurrentProductId,
  //       itemFav: 1,
  //     })
  //   ).then((data) => {
  //     if (data?.payload?.success) {
  //       dispatch(fetchWishlistItems(user?.id));
  //       toast({
  //         title: "Product is added to wishlist",
  //       });
  //     }
  //   });
  // }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails?._v && selectedColor && selectedSize){
      const found = productDetails?._v.find(
        (variant) =>
          variant.color?.includes(selectedColor) &&
          variant.size?.includes(selectedSize)
      );
      setMatchedVariant(found);
    }else {
      setMatchedVariant(null);
    }
  }, [selectedColor, selectedSize, productDetails]);

  console.log(reviews, "reviews");

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[90vw] md:max-w-[100vw] max-h-screen overflow-y-auto">
        <div className="relative overflow-hidden rounded-lg">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="w-full aspect-square"
          >
            {(Array.isArray(productDetails?.image) ? productDetails.image : [productDetails?.image]).map((img, index) => (  
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={productDetails?.title}
                  width={400}
                  height={500}
                  className="aspect-square w-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="">
          <div>
            <h1 className="text-lg md:text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-base md:text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-lg md:text-xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ₹{productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-lg md:text-xl font-bold text-muted-foreground">
                ₹{productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex flex-row gap-2">
              {productDetails?.color?.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full mx-1 ${selectedColor === color ? "ring-2 ring-black" : ""}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex flex-row gap-2">
              {productDetails?.size?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-3 py-1 rounded mx-1 ${selectedSize === size ? "bg-black text-white" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-[50%] opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-[50%]"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                <ShoppingCartIcon />  Add to Cart
              </Button>
            )}
            <Button
              className="w-[50%]"
              // onClick={() =>
              //   handleAddToWishlist(productDetails?._id)
              // }
            >
              <HeartIcon/> Wishlist
            </Button>
          </div>
          <Separator />
          <div className="mt-4">
            <Button
              className="w-full text-left p-4 flex justify-between items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <h3 className="text-lg md:text-xl font-bold py-4 bg-transparent">Returns & Exchange</h3>
              <span className="text-lg font-bold">{isOpen ? "−" : "+"}</span>
            </Button>
            {isOpen && (
              <div className="p-4 border-t text-sm text-gray-700">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Hassle-free returns within 7 days under specific product and promotion conditions.</li>
                  <li>Refunds for prepaid orders revert to the original payment method, while COD orders receive a wallet refund.</li>
                  <li>Report defective, incorrect, or damaged items within 24 hours of delivery.</li>
                  <li>Products bought during special promotions like BOGO are not eligible for returns.</li>
                  <li>For excessive returns, reverse shipment fee up to Rs 100 can be charged, which will be deducted from the refund.</li>
                  <li>Non-returnable items include accessories, sunglasses, perfumes, masks, and innerwear due to hygiene concerns.</li>
                </ol>
              </div>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-lg md:text-xl font-bold mb-4">Product Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;