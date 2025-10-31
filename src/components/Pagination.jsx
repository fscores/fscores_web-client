import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import LoadingBox from "./LoadingBox";

const Pagination = ({ metadata, handlePageChange, currentPageNo }) => {
  const [currentPage, setCurrentPage] = useState(currentPageNo);

  return (
    <div className="mx-2 flex justify-center gap-2">
      <nav aria-label="Page navigation example">
        <ul class="flex items-center -space-x-px h-10 text-base">
          <li>
            <button
              onClick={() => {
                if (currentPage === 0) return;
                setCurrentPage(currentPage - 1);
                handlePageChange(currentPage - 1);
              }}
              class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span class="sr-only">Previous</span>
              <svg
                class="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {Array.from({ length: metadata.totalPages }).map((_, i) => {
            const isActive = i === currentPage;

            return (
              <li key={i}>
                <button
                  onClick={() => {
                    setCurrentPage(i);
                    handlePageChange(i);
                  }}
                  // This is functionally identical to your code, but uses the more common template literal syntax
                  class={`flex items-center justify-center px-4 h-10 leading-tight border  border-gray-700 hover:bg-gray-700 hover:text-white
                        ${
                          isActive
                            ? "bg-gray-700 text-white font-bold" // Note: the space before the active classes is essential here
                            : "bg-gray-800 text-gray-400"
                        }`}
                >
                  {i + 1}
                </button>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => {
                if (currentPage === metadata.totalPages - 1) return;
                setCurrentPage(currentPage + 1);
                handlePageChange(currentPage + 1);
              }}
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span class="sr-only">Next</span>
              <svg
                class="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
