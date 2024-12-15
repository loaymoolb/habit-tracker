import React from "react";
import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OCRUploader } from "../components/OCRUploader";

describe("OCRUploader Component", () => {
  test("renders without errors", () => {
    const mockResetComplete = vi.fn();
    render(
      <OCRUploader
        onExtractText={vi.fn()}
        resetUploader={false}
        onResetComplete={mockResetComplete}
      />
    );
    expect(screen.getByTestId("image-upload")).toBeInTheDocument();
  });

  test("displays error when no image is uploaded", () => {
    const mockResetComplete = vi.fn();
    render(
      <OCRUploader
        onExtractText={vi.fn()}
        resetUploader={false}
        onResetComplete={mockResetComplete}
      />
    );
    fireEvent.click(screen.getByTestId("extract-text-btn"));
    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Please upload an image."
    );
  });

  test("clears error on new image upload", () => {
    const mockResetComplete = vi.fn();
    render(
      <OCRUploader
        onExtractText={vi.fn()}
        resetUploader={false}
        onResetComplete={mockResetComplete}
      />
    );
    const fileInput = screen.getByTestId("image-upload");
    const file = new File(["dummy content"], "test.png", { type: "image/png" });

    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
  });

  test("resets uploader state when resetUploader is true", () => {
    const mockResetComplete = vi.fn();
    const { rerender } = render(
      <OCRUploader
        onExtractText={vi.fn()}
        resetUploader={true}
        onResetComplete={mockResetComplete}
      />
    );
    const fileInput = screen.getByTestId("image-upload") as HTMLInputElement;
    expect(fileInput.value).toBe("");
    expect(mockResetComplete).toHaveBeenCalled();
    rerender(
      <OCRUploader
        onExtractText={vi.fn()}
        resetUploader={false}
        onResetComplete={mockResetComplete}
      />
    );
    expect(mockResetComplete).toHaveBeenCalledTimes(1);
  });
});
