import React, { useMemo } from 'react';
import { generatePagination } from '../../utils/pagination';

type Props = {
  currentPage: number;
  pages: number;
  onChangePage: (page: number) => void;
};

const Pagination = ({ currentPage, pages, onChangePage }: Props) => {
  const pagesArray = useMemo(
    () => generatePagination(currentPage, pages),
    [currentPage, pages]
  );
  return (
    <div className="flex gap-2">
      {pagesArray.map((pagination, index) =>
        typeof pagination === 'string' ? (
          <span key={`${index}-${pagination}`} className="tracking-widest">
            {pagination}
          </span>
        ) : (
          <span
            className={`px-2 border bg-opacity-50 rounded-full cursor-pointer ${
              pagination === currentPage ? 'font-bold bg-poison' : 'bg-gray-500'
            }`}
            key={`${index}-${pagination}`}
            onClick={() => onChangePage(pagination)}
          >
            {pagination}
          </span>
        )
      )}
    </div>
  );
};

export default Pagination;
