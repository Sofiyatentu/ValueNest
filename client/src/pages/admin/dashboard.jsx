import { useEffect, useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addFeatureImage, getFeatureImages } from "@/store/featureSlice";

function AdminDashboard() {
  const [imageFile, setimageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch();
  const { featureImagesList } = useSelector((state) => state.feature);

  function handleFeatureImageUpload() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setUploadedImageUrl("");
        setimageFile(null);
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImagesList, "featureimages");

  return (
    <div>
      <ImageUpload
        file={imageFile}
        setFile={setimageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoading={setImageLoading}
        imageLoading={imageLoading}
        isCustomStyling={true}
        // currenteditedId={currenteditedId}
        // isEditMode={currenteditedId !== null}
      />
      <Button onClick={() => handleFeatureImageUpload()} className="">
        Upload
      </Button>
      <div>
        {featureImagesList && featureImagesList.length > 0
          ? featureImagesList.map((item) => (
              <div>
                <img src={item.image} alt="" />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
