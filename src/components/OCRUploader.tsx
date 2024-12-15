import React, { useState } from "react";
import axios from "axios";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface OCRUploaderProps {
  onExtractText: (text: string) => void;
  resetUploader: boolean;
  onResetComplete: () => void;
}

export function OCRUploader({
  onExtractText,
  resetUploader,
  onResetComplete,
}: OCRUploaderProps) {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setError("");
    }
  };

  const handleExtractText = async () => {
    if (!image) {
      setError("Please upload an image.");
      return;
    }

    setError("");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://api.api-ninjas.com/v1/imagetotext",
        formData,
        {
          headers: {
            "X-Api-Key": process.env.VITE_API_NINJAS_KEY,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const extractedText = response.data
        .map((item: { text: string }) => item.text)
        .join(" ");
      onExtractText(extractedText);
    } catch (err) {
      setError("Failed to extract text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (resetUploader) {
      setImage(null);
      setError("");
      onResetComplete();
    }
  }, [resetUploader, onResetComplete]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Image to Text OCR
      </h1>
      <div className="mb-4">
        <label
          htmlFor="file-upload"
          className="flex items-center text-gray-600 justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-600 flex items-center gap-1">
            {image ? (
              `File Selected: ${image.name}`
            ) : (
              <>
                <UploadFileIcon />
                <strong>Click to upload</strong> or drag and drop a file here
              </>
            )}
          </span>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleImageUpload}
          data-testid="image-upload"
          className="hidden"
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mb-4" data-testid="error-message">
          {error}
        </p>
      )}
      <button
        onClick={handleExtractText}
        disabled={isLoading}
        className={`w-full py-3 px-6 font-medium text-white rounded-lg transition ${
          isLoading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        data-testid="extract-text-btn"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
            Extracting...
          </span>
        ) : (
          "Extract Text"
        )}
      </button>
    </div>
  );
}
