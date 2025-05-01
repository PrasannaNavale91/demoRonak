import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef, useState } from "react";
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
  const [selectedFiles, setSelectedFiles] = useState([]);

  function handleImageFileChange(event) {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length) {
      setImageFile((prev) => [...prev, ...selectedFiles]);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files || []);
    if (files.length) {
      setImageFile((prev) => [...prev, ...files]);
    }
  }
  
  function handleRemoveImage(index) {
    const newFiles = [...imageFile];
    newFiles.splice(index, 1);
    setImageFile(newFiles);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const uploadedUrls = [];
    
    for (const file of selectedFiles) {
      const data = new FormData();
      data.append("my_file", file);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "jackiieee");

      try {
        const response = await axios.post(
          "https://ecommerce-app-xg3v.onrender.com/api/admin/products/upload-image",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response?.data?.success) {
          uploadedUrls.push(response.data.result.url);
        }
      } catch (error) {
        console.error("Error uploading images:", error);
      }
      
      setUploadedImageUrl(uploadedUrls);
      setImageFile([]);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile.length) uploadImageToCloudinary();
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
          multiple
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
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
        {imageFile.length > 0 && (
          <div className="mt-4 space-y-2">
            {imageFile.map((file, index) => (
              <div key={index} className="flex items-center justify-between border rounded p-2">
                <div className="flex items-center gap-2">
                  <FileIcon className="w-6 h-6 text-primary" />
                  <p className="text-sm truncate max-w-[200px]">{file.name}</p>
                </div>
                {imageLoadingState ? (
                  <Skeleton className="h-4 w-16 bg-gray-100" />
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <XIcon className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;