import React from "react";
import HistoryIcon from "@mui/icons-material/History";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface HistoryProps {
  history: string[];
  onClearHistory: () => void;
  onDeleteItem: (index: number) => void;
}

export function History({
  history,
  onClearHistory,
  onDeleteItem,
}: HistoryProps) {
  return (
    <div
      className="p-6 bg-white border rounded-lg shadow-md mt-6 max-w-md mx-auto"
      data-testid="history"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <HistoryIcon className="text-blue-500 mr-2" />
        History
      </h2>
      {history.length === 0 ? (
        <p className="text-gray-500 text-center" data-testid="no-history">
          No history available
        </p>
      ) : (
        <ul
          data-testid="history-list"
          className="divide-y divide-gray-200 border rounded-lg overflow-hidden"
        >
          {history.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 gap-2 hover:bg-gray-50 transition-colors"
              data-testid={`history-item-${index}`}
            >
              <span className="text-gray-800">{item}</span>
              <button
                onClick={() => onDeleteItem(index)}
                className="text-red-500 hover:text-red-600 p-2 hover:border-gray-100 focus:hover:border-gray-100 transition-colors"
                data-testid={`delete-item-btn-${index}`}
                aria-label={`Delete item ${item}`}
              >
                <DeleteOutlineIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
      {history.length > 0 && (
        <button
          onClick={onClearHistory}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 hover:border-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          data-testid="clear-history-btn"
        >
          Clear All History
        </button>
      )}
    </div>
  );
}
