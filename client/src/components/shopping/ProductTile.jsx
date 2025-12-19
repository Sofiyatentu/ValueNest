import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ProductTile({ product, handlegetProductDetails, handleAddtoCart }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handlegetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.stock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out of Stock
            </Badge>
          ) : product?.stock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-600">{`${product?.stock} left`}</Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {product?.category}
            </span>
            <span className="text-sm text-muted-foreground">
              {product?.brand}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibolad text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibolad text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.stock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.stock)}
            className="w-full"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ProductTile;
