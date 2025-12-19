import ProductTile from "@/components/shopping/ProductTile";
import { Input } from "@/components/ui/input";
import {
  getSearchProducts,
  resetSearchResults,
} from "@/store/shop/searchSlice";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { getProductDetails } from "@/store/shop/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import ProductDetails from "@/components/shopping/ProductDetails";

function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.search);
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.shop);
  const [open, setOpen] = useState(false);

  function handlegetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId, "currentpoduct");
    dispatch(getProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId, getStock) {
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getStock) {
          toast(`Only ${getQuantity} can be added`);
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
        toast("Product is added to cart");
      }
    });
  }

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchProducts(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  useEffect(() => {
    if (productDetails !== null) setOpen(true);
  }, [productDetails]);

  console.log(searchResults, "searchResulst");
  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((item) => (
            <ProductTile
              product={item}
              handlegetProductDetails={handlegetProductDetails}
              handleAddtoCart={handleAddtoCart}
            />
          ))
        ) : (
          <h1 className="text-5xl font-extrabold">No result found</h1>
        )}
      </div>
      <ProductDetails
        open={open}
        setOpen={setOpen}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchPage;
