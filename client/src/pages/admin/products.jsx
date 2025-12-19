import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { addProductFormControls } from "@/config";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import ImageUpload from "@/components/admin/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/productSlice";
import { toast } from "sonner";
import ProductTile from "@/components/admin/productTile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: 0,
  salePrice: 0,
  stock: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setimageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [currenteditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);

  function onSubmit(e) {
    e.preventDefault();
    currenteditedId !== null
      ? dispatch(editProduct({ id: currenteditedId, formData })).then(
          (data) => {
            console.log(data);
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        )
      : dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then(
          (data) => {
            console.log(data);
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setOpenCreateProductsDialog(false);
              setimageFile(null);
              setFormData(initialFormData);
              toast("New product is added");
            }
          }
        );
  }

  function handleDelete(productId) {
    dispatch(deleteProduct(productId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isValidForm() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  console.log(productList);
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((p) => (
              <ProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={p}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currenteditedId !== null ? "Edit product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ImageUpload
            file={imageFile}
            setFile={setimageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoading={setImageLoading}
            imageLoading={imageLoading}
            currenteditedId={currenteditedId}
            isEditMode={currenteditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={currenteditedId !== null ? "Edit" : "Add"}
              onSubmit={onSubmit}
              formControls={addProductFormControls}
              isbtnDisabled={!isValidForm()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
