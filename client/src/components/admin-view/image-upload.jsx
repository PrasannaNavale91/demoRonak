import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImages,
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
  console.log(isEditMode, "isEditMode");

  function handleImageFileChange(event) {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
    setImages(files);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files || []);
    setImageFile(prev => [...prev, ...files]);
  }
  
  function handleRemoveImage(index) {
    const newFiles = [...imageFile];
    newFiles.splice(index, 1);
    setImageFile(newFiles);
  }

  async function uploadImageToCloudinary(imageFile) {
    setImageLoadingState(true);
    
    const uploadedUrls = [];
    
    for (const file of imageFile) {
      const data = new FormData();
      data.append("my_file", file);
      data.append("upload_preset", "ecommerce");
      try {
        const response = await axios.post(
          "https://ecommerce-app-xg3v.onrender.com/api/admin/products/upload-image",
          data
        );

        uploadedUrls.push(response.data.result.url);

        if (uploadedUrls.length > 0) {
          setImageFile(downloadURL);
        }
      } catch (error) {
        console.error("Image upload error:", error);
      }
    }
    
    setUploadedImageUrl(uploadedUrls);
    setImageLoadingState(false);
  }

  useEffect(() => {
    if (Array.isArray(imageFile) && imageFile.length > 0) {
      uploadImageToCloudinary();
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
          accept="image/*"
          onChange={handleImageFileChange}
          disabled={isEditMode}
          multiple
        />
        {!imageFile.length ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          imageFile.map((file, index) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;