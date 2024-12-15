# **Image to Text OCR App**

A React-based web application that extracts text from images using OCR (Optical Character Recognition). The app offers a seamless experience with image uploads, text extraction, and history management, all powered by the [API Ninjas OCR API](https://api.api-ninjas.com/).

## **Features**

- **Upload Images**: Drag and drop or select JPEG/PNG files.
- **Extract Text**: Convert image content into editable text.
- **History Management**: Save, view, and delete past extractions.
- **Copy to Clipboard**: Easily copy extracted text.
- **Modern UI**: Responsive design with TailwindCSS.

## **Tech Stack**

- **Frontend**: React, TypeScript, TailwindCSS
- **API**: [API Ninjas OCR API](https://api.api-ninjas.com/)
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library

## **Getting Started**

1. Clone the repository:

```bash
git clone https://github.com/your-username/image-to-text-ocr.git
cd image-to-text-ocr
```

2. Install dependencies:

```
npm install
```

3. Create a .env file in the project root:

```
VITE_API_NINJAS_KEY=your-api-key
```

4. Start the development server:

```
npm run dev
```
