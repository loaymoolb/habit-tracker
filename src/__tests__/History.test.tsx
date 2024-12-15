import React from "react";
import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { History } from "../components/History";

describe("History Component", () => {
  test("renders empty state when no history is present", () => {
    render(
      <History history={[]} onClearHistory={vi.fn()} onDeleteItem={vi.fn()} />
    );
    expect(screen.getByTestId("no-history")).toBeInTheDocument();
    expect(screen.queryByTestId("history-list")).not.toBeInTheDocument();
  });

  test("renders history items correctly", () => {
    const history = ["First extracted text", "Second extracted text"];
    render(
      <History
        history={history}
        onClearHistory={vi.fn()}
        onDeleteItem={vi.fn()}
      />
    );

    const historyList = screen.getByTestId("history-list");
    expect(historyList.children).toHaveLength(2);

    expect(screen.getByTestId("history-item-0")).toHaveTextContent(
      "First extracted text"
    );
    expect(screen.getByTestId("history-item-1")).toHaveTextContent(
      "Second extracted text"
    );
  });

  test("clears all history when clear button is clicked", () => {
    const mockClearHistory = vi.fn();
    render(
      <History
        history={["Item 1"]}
        onClearHistory={mockClearHistory}
        onDeleteItem={vi.fn()}
      />
    );

    const clearButton = screen.getByTestId("clear-history-btn");
    fireEvent.click(clearButton);

    expect(mockClearHistory).toHaveBeenCalledTimes(1);
  });

  test("deletes an individual history item", () => {
    const mockDeleteItem = vi.fn();
    const history = ["First extracted text", "Second extracted text"];
    render(
      <History
        history={history}
        onClearHistory={vi.fn()}
        onDeleteItem={mockDeleteItem}
      />
    );

    const deleteButton = screen.getByTestId("delete-item-btn-0");
    fireEvent.click(deleteButton);

    expect(mockDeleteItem).toHaveBeenCalledWith(0);
  });

  test("ensures delete button is present for all history items", () => {
    const mockDeleteItem = vi.fn();
    const history = ["First extracted text", "Second extracted text"];
    render(
      <History
        history={history}
        onClearHistory={vi.fn()}
        onDeleteItem={mockDeleteItem}
      />
    );

    const deleteButton0 = screen.getByTestId("delete-item-btn-0");
    const deleteButton1 = screen.getByTestId("delete-item-btn-1");

    expect(deleteButton0).toBeInTheDocument();
    expect(deleteButton1).toBeInTheDocument();
  });
});
