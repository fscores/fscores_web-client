import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import LoadingBox from "./LoadingBox";

const Pagination = ({ metadata, handlePageChange, currentPageNo }) => {
  const [currentPage, setCurrentPage] = useState(currentPageNo);

  return (
    <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => {
            if (currentPage > 1) {
              console.log("Previous page clicked");
              // setCurrentPage(currentPage - 1);
              // handlePageChange(currentPage - 1);
            }
          }}
          className="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10"
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (currentPage < metadata.totalPages) {
              console.log("Next page clicked");
              // setCurrentPage(currentPage + 1);
              // handlePageChange(currentPage + 1);
            }
          }}
          className="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-300">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * metadata.pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {currentPage * metadata.pageSize < metadata.totalElements
                ? currentPage * metadata.pageSize
                : metadata.totalElements}
            </span>{" "}
            of <span className="font-medium">{metadata.totalElements}</span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md"
          >
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                  handlePageChange(currentPage - 1);
                }
              }}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </button>
            {(() => {
              const pages = [];
              const total = metadata.totalPages;
              const maxVisible = 5; // how many pages to display around current page

              let start = Math.max(1, currentPage - 2);
              let end = Math.min(total, currentPage + 2);

              // Adjust window if near start or end
              if (currentPage <= 3) {
                end = Math.min(total, maxVisible);
              }
              if (currentPage >= total - 2) {
                start = Math.max(1, total - maxVisible + 1);
              }

              // Always include first page
              if (start > 1) {
                pages.push(1);
                if (start > 2) pages.push("...");
              }

              // Main page range
              for (let i = start; i <= end; i++) {
                pages.push(i);
              }

              // Always include last page
              if (end < total) {
                if (end < total - 1) pages.push("...");
                pages.push(total);
              }

              return pages.map((page, index) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-3 py-2 text-gray-400"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      handlePageChange(page);
                    }}
                    className={`relative inline-flex items-center px-3 py-2 text-sm font-medium ${
                      page === currentPage
                        ? "z-10 bg-indigo-600 text-white"
                        : "text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                )
              );
            })()}

            <button
              onClick={() => {
                if (currentPage < metadata.totalPages) {
                  setCurrentPage(currentPage + 1);
                  handlePageChange(currentPage + 1);
                }
              }}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
