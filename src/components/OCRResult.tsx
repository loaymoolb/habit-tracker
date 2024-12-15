import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface OCRResultProps {
  extractedText: string;
  onClear: () => void;
}

export function OCRResult({ extractedText, onClear }: OCRResultProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    alert("Text copied to clipboard!");
  };

  return (
    <div
      className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg mt-6"
      data-testid="ocr-result"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Extracted Text
      </h2>
      <div
        className="p-4 bg-gray-50 border rounded-md text-gray-700 text-sm mb-6 overflow-auto"
        data-testid="extracted-text"
        style={{ maxHeight: "150px" }}
      >
        {extractedText}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 hover:border-green-700 text-white font-medium rounded-md transition duration-200"
          data-testid="copy-btn"
        >
          <ContentCopyIcon className="h-5 w-5 mr-2" />
          Copy to Clipboard
        </button>
        <button
          onClick={onClear}
          className="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 hover:border-red-700 text-white font-medium rounded-md transition duration-200"
          data-testid="clear-btn"
        >
          <DeleteOutlineIcon className="h-5 w-5 mr-2" />
          Clear
        </button>
      </div>
    </div>
  );
}
