import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function UserWishlistWrapper({ wishlistItems, setOpenWishlistSheet, handleGetProductDetails }) {
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
          ? wishlistItems.map((item) => (
            <div
              onClick={() => handleGetProductDetails(item.productId)}
              key={item.productId}
              className="flex items-center justify-between border p-2 rounded"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={Array.isArray(item?.image) ? item?.image[0] : item?.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-500">
                    ₹{item.salePrice > 0 ? item.salePrice : item.price}
                  </p>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-gray-500">No items in your wishlist.</p>
          )}
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