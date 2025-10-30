import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import LoadingBox from "./LoadingBox";

const Pagination = ({ metadata, handlePageChange, currentPageNo }) => {
  const [currentPage, setCurrentPage] = useState(currentPageNo);

  return (
    <div>
      Pagination
    </div>
  );
};

export default Pagination;
