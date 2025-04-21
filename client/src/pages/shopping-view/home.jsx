import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner_1.png";
import bannerTwo from "../../assets/banner_2.png";
import bannerThree from "../../assets/banner_3.png";
import {
  Airplay,
  ChevronLeftIcon,
  ChevronRightIcon,
  FacebookIcon,
  Heater,
  Images,
  InstagramIcon,
  LinkedinIcon,
  Mail,
  Shirt,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
  YoutubeIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const collectionWithIcon = [
  { id: "shirts", label: "Shirts", icon: Shirt },
  { id: "t-shirts", label: "T-Shirts", icon: WashingMachine },
  { id: "trousers", label: "Trousers", icon: WatchIcon },
  { id: "jeans", label: "Jeans", icon: UmbrellaIcon },
  { id: "cargos", label: "Cargos", icon: ShoppingBasket },
  { id: "joggers", label: "Joggers", icon: Airplay },
  { id: "oversized", label: "Oversized", icon: Images },
  { id: "hoodies", label: "Hoodies", icon: Heater },
  { id: "sweatshirts", label: "Sweatshirts", icon: Heater },
  { id: "jackets", label: "Jackets", icon: Heater },
  { id: "shorts", label: "Shorts", icon: Heater },
  { id: "formal", label: "Formal Wear", icon: Heater },
  { id: "footwear", label: "Footwear", icon: Heater },
  { id: "accessories", label: "Accessories", icon: Heater },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + productList.length) % productList.length);
  };
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
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

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);
  
  const combinedFeatureImages = [
    { image: bannerOne },
    { image: bannerTwo },
    { image: bannerThree },
    ...(featureImageList || []),
  ].filter((slide) => slide?.image);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % combinedFeatureImages.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [combinedFeatureImages]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://ecommerce-d3qt.onrender.com/api/shop/home/send-subscribe-email`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setEmail({ email: "" });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? combinedFeatureImages.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + combinedFeatureImages.length) %
              combinedFeatureImages.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % combinedFeatureImages.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Check Out Our Collection</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {collectionWithIcon.map((collectionItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(collectionItem, "collection")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <collectionItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{collectionItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 20}%)` }}
            >
              {productList && productList.length > 0
                ? productList.map((productItem, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2"
                  >
                    <ShoppingProductTile
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                      className="h-full flex justify-center items-center"
                    />
                  </div>
                  ))
                : null}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 z-10"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 z-10"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />

      <section className=" bg-orange-400">
        <div className="container py-12 px-10 text-center">
          <p className="text-xs uppercase font-bold text-gray-100 tracking-widest">this weekend only</p>
          <h3 className="text-4xl md:text-6xl lg:text-9xl text-gray-100 py-8 uppercase font-bold tracking-widest">Sale</h3>
          <Link to="/shop/listing" className="bg-white py-3 px-16 rounded-none text-slate-950">
            <span className="text-slate-950">Shop Now</span>
          </Link>
        </div>
      </section>

      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            New Arrivals
          </h2>
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 20}%)` }}
            >
              {productList && productList.length > 0
                ? productList.map((productItem, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2"
                  >
                    <ShoppingProductTile
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                      className="h-full w-64 flex justify-center items-center"
                    />
                  </div>
                  ))
                : null}
            </div>

            <button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 z-10"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 z-10"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section> */}

      <section className="py-12 border-t-2">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:p-12 max-w-[90vw]">
            <div>
              <h2 className="text-xl py-8 uppercase tracking-widest">get to know us</h2>
              <ul className="list-none text-xs">
                <li className="py-2">FAQ's</li>
                <li className="py-2">Blogs</li>
                <li className="py-2">Terms & Conditions</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl py-8 uppercase tracking-widest">orders</h2>
              <ul className="list-none text-xs">
                <li className="py-2">Track Order</li>
                <li className="py-2">Returns/Exchane Policy</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl py-8 uppercase tracking-widest">sign up and save</h2>
              <small className="py-2">Sign up now and be the first to know about exclusive offers, latest fashion trends & style tips!</small>
              <div className="flex py-6">
                <input
                  type="text"
                  placeholder="Enter your mail"
                  value={email.email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-0 border-b-2 border-slate-950 placeholder:text-sm placeholder:text-slate-950 focus:outline-none focus:border-0 w-80"
                />
                <Link className="border-0" to="/shop/listing" type="button" onSubmit={handleSubmit}>
                  <Mail />
                </Link>
              </div>
              <ul className="flex justify-items-start">
                <li className="pr-2"><InstagramIcon /></li>
                <li className="px-2"><FacebookIcon /></li>
                <li className="px-2"><YoutubeIcon /></li>
                <li className="px-2"><LinkedinIcon /></li>
              </ul>
            </div>
          </div>
          <div className="p-3 text-center">
            <p>&copy; 2025 TrendCrave&reg;</p>
            <small>Made in India</small>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShoppingHome;