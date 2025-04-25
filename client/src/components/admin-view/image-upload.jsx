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
    console.log(event.target.files, "event.target.files");
    const selectedFile = Array.from(event.target.files || []);
    console.log(selectedFile);

    if (selectedFile) setImageFile(selectedFile);
    setImageFile(prev => [...prev, ...files]);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = Array.from(event.dataTransfer.files || []);
    if (droppedFile) setImageFile(droppedFile);
    droppedFile(prev => [...prev, ...files]);
  }
  
  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    
    const uploadedUrls = [];
    
    for (const file of imageFile) {
      const data = new FormData();
      data.append("my_file", file);
      const response = await axios.post(
        "https://ecommerce-app-xg3v.onrender.com/api/admin/products/upload-image",
        data
      );
      console.log(response, "response");
      
      if (response?.data?.success) {
        uploadedUrls.push(response.data.result.url);
      }
    }
    
    setUploadedImageUrl(uploadedUrls);
    setImageLoadingState(false);
  }

  useEffect(() => {
    if (imageFile.length > 0) uploadImageToCloudinary();
  }, [imageFile]);
  
  function handleRemoveImage(index) {
    const newFiles = [...imageFile];
    newFiles.splice(index, 1);
    setImageFile(newFiles);
  }

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
        {!imageFile.length > 0 ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : !imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
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
              onClick={handleRemoveImage(index)}
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

export default ProductImageUpload;