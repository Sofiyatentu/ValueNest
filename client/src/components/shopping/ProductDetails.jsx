import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { clearProductDetails } from "@/store/shop/productSlice";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/starRating";
import { useEffect, useState } from "react";
import { addProductReview, getProductReviews } from "@/store/shop/reviewSlice";

function ProductDetails({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setrating] = useState(0);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.review);

  const totalReviewsLength = reviews.length;
  const averageReview =
    reviews.reduce((sum, item) => sum + item.reviewValue, 0) /
    totalReviewsLength;

  function handleAddReview() {
    dispatch(
      addProductReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.paylod?.success) {
        dispatch(getProductReviews(productDetails?._id));
        toast("Review added successfully");
      }
    });
  }

  function handleratingChange(getRating) {
    setrating(getRating);
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
        setrating(0);
        setReviewMsg("");
        dispatch(fetchCartItems(user?.id));
        toast("Product is added to cart");
      }
    });
  }

  function handleDialogClose() {
    setOpen(false), dispatch(clearProductDetails());
    setReviewMsg("");
    setrating(0);
  }

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getProductReviews(productDetails?._id));
    }
  }, [productDetails]);

  console.log(reviews, "reviews");

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
          <p className="text-muted-foreground text-2xl mb-5 mt-4">
            {productDetails?.description}
          </p>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview.toFixed(2)} />
              <span className="text-muted-foreground ">{averageReview}</span>
            </div>
          </div>
          <div className="mt-5 mb-3">
            {productDetails?.stock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleAddtoCart(productDetails?._id, productDetails?.stock)
                }
                className="w-full"
              >
                Add to Cart
              </Button>
            )}
          </div>
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((item) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {item?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{item?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={item?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {item?.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No reviews</h1>
              )}
            </div>
            <div className="mt-10 flex flex-col gap-2">
              <Label>Write a review</Label>
              <div className="flex">
                <StarRatingComponent
                  rating={rating}
                  handleratingChange={handleratingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
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

export default ProductDetails;
