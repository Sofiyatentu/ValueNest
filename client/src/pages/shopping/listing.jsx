import ProductDetails from "@/components/shopping/ProductDetails";
import ProductFIlter from "@/components/shopping/ProductFilter";
import ProductTile from "@/components/shopping/ProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import {
  getAllFilteredProducts,
  getProductDetails,
} from "@/store/shop/productSlice";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { toast } from "sonner";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function Listing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shop);
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [setFilters, setSort]);

  useEffect(() => {
    if (location?.state?.filtersUpdated) {
      setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
    }
  }, [location?.state?.filtersUpdated]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        getAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpen(true);
  }, [productDetails]);

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    console.log(cpyFilters);
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handlegetProductDetails(getCurrentProductId) {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFIlter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList.length} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem value={item.id} key={item.id}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1  sm-grid-cols-2 md:grid-cols-3 lg:grid-cols-4gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((item) => (
                <ProductTile
                  product={item}
                  handlegetProductDetails={handlegetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetails
        open={open}
        setOpen={setOpen}
        productDetails={productDetails}
      />
    </div>
  );
}

export default Listing;
