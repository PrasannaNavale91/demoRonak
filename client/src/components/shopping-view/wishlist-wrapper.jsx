import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserWishlistItemsContent from "./wishlist-item-content";


function UserWishlistWrapper({ wishlistItems, setOpenWishlistSheet }) {
  const navigate = useNavigate();

  const totalWishlistAmount =
    wishlistItems && wishlistItems.length > 0
      ? wishlistItems.reduce(
          (sum, item) =>
            sum + (item?.salePrice > 0 ? item?.salePrice : item?.price),
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
          ? wishlistItems.map((item) => <UserWishlistItemsContent wishlistItem={item} />)
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