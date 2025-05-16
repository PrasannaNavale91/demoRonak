import { Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishlistItem } from "@/store/shop/wishlist-slice";
import { useToast } from "../../hooks/use-toast";

function UserCartItemsContent({ wishlistItem }) {
  const { user } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.shopWishlist);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleWishlistItemDelete(item) {
    let getWishlistItems = wishlistItems.items || [];

    if (getWishlistItems.length) {
      const indexOfCurrentWishlistItem = getWishlistItems.findIndex(
        (item) => item.productId === item?.productId
      );

      if (indexOfCurrentWishlistItem > -1) {
        getWishlistItems.splice(indexOfCurrentWishlistItem, 1);
      }
    }
      dispatch(
        deleteWishlistItem({ userId: user?.id, productId: item?.productId })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Wishlist item is deleted successfully",
          });
        }
      });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={Array.isArray(wishlistItem?.image) ? wishlistItem?.image[0] : wishlistItem?.image}
        alt={wishlistItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{wishlistItem?.title}</h3>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₹
          {(
            (wishlistItem?.salePrice > 0 ? wishlistItem?.salePrice : wishlistItem?.price) *
            wishlistItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleWishlistItemDelete(wishlistItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;