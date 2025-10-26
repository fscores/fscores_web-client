import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import LoadingBox from "./LoadingBox";

const Pagination = ({ metadata }) => {
  const [currentPage, setCurrentPage] = useState(1);

  if(metadata == null) {
    return <LoadingBox />;
  }

  return (
    <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-300">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{metadata.pageSize}</span> of{" "}
            <span className="font-medium">{metadata.totalElements}</span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </a>
            {/* Current: "z-10 text-white focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-500 focus-visible:outline-indigo-500", Default: "inset-ring focus:outline-offset-0 text-gray-200 inset-ring-gray-700 hover:bg-white/5" */}
            {Array.from({ length: metadata.totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isCurrent = pageNumber === currentPage;

              return (
                <a
                  key={pageNumber}
                  href="#"
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
                >
                  {pageNumber}
                </a>
              );
            })}

            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
