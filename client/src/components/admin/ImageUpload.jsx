import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
function ImageUpload({
  file,
  setFile,

  setUploadedImageUrl,
  setImageLoading,
  imageLoading,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);
  const isDemo = useSelector((state) => state.auth.user?.isDemo);
  function handleImageFileChange(e) {
    const selectedFile = e.target.files?.[0];
    if (isDemo) {
      toast('Demo admin: use real admin credentials to upload images', {
        duration: 4000,
      });
      return;
    }
    if (selectedFile) setFile(selectedFile);
  }
  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (isDemo) {
      toast('Demo admin: use real admin credentials to upload images', {
        duration: 4000,
      });
      return;
    }
    if (droppedFile) setFile(droppedFile);
  }
  function handleRemoveImage() {
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  const uploadImagetoCloud = useCallback(async () => {
    if (isDemo) {
      setImageLoading(false);
      toast('Demo admin: use real admin credentials to upload images', {
        duration: 4000,
      });
      return;
    }

    setImageLoading(true);

    const data = new FormData();
    data.append('my_file', file);

    const token = JSON.parse(sessionStorage.getItem('token'));
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.data.success) {
      setUploadedImageUrl(response.data.result.secure_url);
      setImageLoading(false);
    }
  }, [file, isDemo, setImageLoading, setUploadedImageUrl]);

  useEffect(() => {
    if (file !== null) uploadImagetoCloud();
  }, [file, uploadImagetoCloud]);
  return (
    <div className={`w-full max-w-md mx-auto mt-4 ${isCustomStyling ? '' : 'max-w-md mx-auto'}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? 'opacity-60' : ''}border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!file ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? 'cursor-not-allowed' : null
            }flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or Click to upload image</span>
          </Label>
        ) : imageLoading ? (
          <div className="bg-grey"></div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{file.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
