import './App.css'
import React, { useState } from "react";
import { OCRUploader } from "./components/OCRUploader";
import { OCRResult } from "./components/OCRResult";
import { History } from "./components/History";
import { Footer } from './components/Footer';
import { useLocalStorage } from "./utils/useLocalStorage";


function App() {

 const [extractedText, setExtractedText] = useState("");
  const [history, setHistory] = useLocalStorage("ocr-history", []);
  const [resetUploader, setResetUploader] = useState(false);

  const handleExtractText = (text) => {
    setExtractedText(text);
    setHistory([...history, text]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleDeleteItem = (index) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearResults = () => {
    setExtractedText("");
    setResetUploader(true); 
  };

  return (
    <div className="p-4">
      <OCRUploader
        onExtractText={handleExtractText}
        resetUploader={resetUploader}
        onResetComplete={() => setResetUploader(false)} 
      />
      {extractedText && (
        <OCRResult extractedText={extractedText} onClear={handleClearResults} />
      )}
      <History
        history={history}
        onClearHistory={handleClearHistory}
        onDeleteItem={handleDeleteItem}
      />
      <Footer />
    </div>
  );

}

export default App;
