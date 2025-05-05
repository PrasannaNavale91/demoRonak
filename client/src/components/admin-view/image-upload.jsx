import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  console.log(isEditMode, "isEditMode");

  function handleImageFileChange(event) {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length > 0) {
      setImageFile((prev) => [...prev, ...selectedFiles]);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = Array.from(event.dataTransfer.files || []);
    if (droppedFile.length > 0) {
      setImageFile((prev) => [...prev, ...droppedFiles]);
    }
  }

  function handleRemoveImage(indexToRemove) {
    setImageFile((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setUploadedImageUrl((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const uploadedUrls = [];

    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "https://ecommerce-app-xg3v.onrender.com/api/admin/products/upload-image",
      data,
    );
    console.log(response, "response");

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile.length > 0) {
      uploadAllImages();
    }
  }, [imageFile]);

  return (
    <div
      className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
          multiple
        />
        <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
      </div>

      <div className="mt-4 space-y-2">
        {imageFile.length > 0 &&
          imageFile.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <div className="flex items-center gap-2">
                <FileIcon className="w-5 h-5 text-primary" />
                <p className="text-sm">{file.name}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveImage(idx)}
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
          ))}

        {imageLoadingState && (
          <Skeleton className="h-10 w-full bg-gray-100" />
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;