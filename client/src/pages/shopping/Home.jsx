import { Button } from '@/components/ui/button';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FlagIcon,
  LucideCookie,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  WashingMachine,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Laptop, Handbag, CookingPot, Brush, Dumbbell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFilteredProducts, getProductDetails } from '@/store/shop/productSlice';
import { getFeatureImages } from '@/store/featureSlice';
import { addToCart, fetchCartItems } from '@/store/shop/cartSlice';
import ProductTile from '@/components/shopping/ProductTile';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ProductDetails from '@/components/shopping/ProductDetails';

function Homepage() {
  const [currentSlide, setCUrrentSlide] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList, productDetails } = useSelector((state) => state.shop);
  const { user } = useSelector((state) => state.auth);
  const { featureImagesList } = useSelector((state) => state.feature);
  const [open, setOpen] = useState(false);

  const categoriesWithIcon = [
    { id: 'electronics', label: 'Electronics', icon: Laptop },
    { id: 'fashion', label: 'Fashion', icon: Handbag },
    { id: 'kitchen', label: 'Kitchen', icon: CookingPot },
    { id: 'beauty', label: 'Beauty', icon: Brush },
    { id: 'sports', label: 'Sports', icon: Dumbbell },
  ];
  const brandsWithIcon = [
    { id: 'nike', label: 'Nike', icon: ShirtIcon },
    { id: 'puma', label: 'Puma', icon: FlagIcon },
    { id: 'h&m', label: 'H&M', icon: WashingMachine },
    { id: 'zara', label: 'Zara', icon: ShoppingBasket },
    { id: 'aashirvad', label: 'Aashirvad', icon: LucideCookie },
  ];

  function handleNavigateToListing(getCurrentItem, section) {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate('/shop/list');
  }

  function handlegetProductDetails(getCurrentProductId) {
    dispatch(getProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast('Product is added to cart');
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpen(true);
  }, [productDetails]);

  useEffect(() => {
    if (!featureImagesList || featureImagesList.length === 0) return;

    const timer = setInterval(() => {
      setCUrrentSlide((prevSlide) => (prevSlide + 1) % featureImagesList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featureImagesList]);

  useEffect(() => {
    dispatch(
      getAllFilteredProducts({
        filterParams: {},
        sortParams: 'price-lowtohigh',
      }),
    );
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] overflow-hidden">
        {featureImagesList && featureImagesList.length > 0
          ? featureImagesList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                } absolute inset-0 w-full h-full object-cover object-left transition-opacity duration-1000`}
                alt={`banner-${index}`}
                style={{
                  pointerEvents: index === currentSlide ? 'auto' : 'none',
                }}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 z-10"
          onClick={() =>
            featureImagesList &&
            featureImagesList.length > 0 &&
            setCUrrentSlide(
              (prevSlide) => (prevSlide - 1 + featureImagesList.length) % featureImagesList.length,
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 z-10"
          onClick={() =>
            featureImagesList &&
            featureImagesList.length > 0 &&
            setCUrrentSlide((prevSlide) => (prevSlide + 1) % featureImagesList.length)
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((item) => (
              <Card
                onClick={() => handleNavigateToListing(item, 'category')}
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {brandsWithIcon.map((item) => (
              <Card
                onClick={() => handleNavigateToListing(item, 'brand')}
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ProductTile
                    handlegetProductDetails={handlegetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetails open={open} setOpen={setOpen} productDetails={productDetails} />
    </div>
  );
}

export default Homepage;
