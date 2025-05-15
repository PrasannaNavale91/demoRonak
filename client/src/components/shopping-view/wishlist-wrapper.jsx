import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function UserWishlistWrapper({ wishlistItems, setOpenWishlistSheet }) {
  const navigate = useNavigate();

  const totalWishlistAmount =
    wishlistItems && wishlistItems.length > 0
      ? wishlistItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Wishlist</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {wishlistItems && wishlistItems.length > 0
          ? wishlistItems.map((item) => 0)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">₹{totalWishlistAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/listing");
          setOpenWishlistSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserWishlistWrapper;