import React from "react";
import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OCRResult } from "../components/OCRResult";

describe("OCRResult Component", () => {
  beforeAll(() => {
    global.alert = vi.fn();
  });

  test("renders extracted text correctly", () => {
    render(
      <OCRResult extractedText="Sample extracted text" onClear={vi.fn()} />
    );
    expect(screen.getByTestId("extracted-text")).toHaveTextContent(
      "Sample extracted text"
    );
  });

  test("clears extracted text when clear button is clicked", () => {
    const mockClear = vi.fn();
    render(<OCRResult extractedText="Sample text" onClear={mockClear} />);

    const clearButton = screen.getByTestId("clear-btn");
    fireEvent.click(clearButton);

    expect(mockClear).toHaveBeenCalled();
  });

  test("copies extracted text to clipboard", async () => {
    const writeTextMock = vi.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<OCRResult extractedText="Copy this text" onClear={vi.fn()} />);

    const copyButton = screen.getByTestId("copy-btn");
    fireEvent.click(copyButton);

    expect(writeTextMock).toHaveBeenCalledWith("Copy this text");
    expect(global.alert).toHaveBeenCalledWith("Text copied to clipboard!");
  });
});
