import { useState, useEffect, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import LoadingBox from "./LoadingBox"; // Assuming this is still used somewhere else

const MAX_PAGES_VISIBLE = 5; // Define how many page buttons to show in the center

// Helper function to calculate which page numbers should be visible
const getVisiblePages = (currentPage, totalPages, maxVisible) => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  // Calculate start and end indices for the center window
  let start = Math.max(0, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages - 1, start + maxVisible - 1);

  // Adjust if we hit the end
  if (end === totalPages - 1) {
    start = Math.max(0, totalPages - maxVisible);
  }

  const visiblePages = [];
  for (let i = start; i <= end; i++) {
    visiblePages.push(i);
  }

  // Add ellipses and first/last pages if not visible
  if (visiblePages[0] > 0) {
    if (visiblePages[0] > 1) {
      visiblePages.unshift("..."); // Ellipsis
    }
    visiblePages.unshift(0); // First page
  }

  if (visiblePages[visiblePages.length - 1] < totalPages - 1) {
    if (visiblePages[visiblePages.length - 1] < totalPages - 2) {
      visiblePages.push("..."); // Ellipsis
    }
    visiblePages.push(totalPages - 1); // Last page
  }
  
  // Remove duplicates that might be introduced by the edge case logic
  return visiblePages.filter((value, index, self) => self.indexOf(value) === index);
};


const Pagination = ({ metadata, handlePageChange, currentPageNo }) => {
  const { totalPages } = metadata;
  const [currentPage, setCurrentPage] = useState(currentPageNo);

  // Sync internal state with prop if it changes externally (e.g., after a search resets page to 0)
  useEffect(() => {
    setCurrentPage(currentPageNo);
  }, [currentPageNo]);

  const goToPage = useCallback((pageIndex) => {
    if (pageIndex < 0 || pageIndex >= totalPages) return;
    setCurrentPage(pageIndex);
    handlePageChange(pageIndex);
  }, [totalPages, handlePageChange]);

  const visiblePages = getVisiblePages(currentPage, totalPages, MAX_PAGES_VISIBLE);

  return (
    <div className="mx-2 flex justify-center gap-2">
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-10 text-base">
          {/* Previous Button */}
          <li>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
              className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'}`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </li>
          
          {/* Page Buttons */}
          {visiblePages.map((page, index) => {
            if (page === "...") {
              return (
                <li key={`ellipsis-${index}`}>
                  <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-700 dark:text-gray-400 dark:bg-gray-800">
                    ...
                  </span>
                </li>
              );
            }

            const pageIndex = Number(page);
            const isActive = pageIndex === currentPage;

            return (
              <li key={pageIndex}>
                <button
                  onClick={() => goToPage(pageIndex)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-700 
                    ${
                      isActive
                        ? "bg-gray-700 text-white font-bold"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`}
                >
                  {pageIndex + 1}
                </button>
              </li>
            );
          })}
          
          {/* Next Button */}
          <li>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'}`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;