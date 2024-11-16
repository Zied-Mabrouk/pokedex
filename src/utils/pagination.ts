export const generatePagination = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages = 5
) => {
  if (totalPages <= 0) return [];

  const pagination = [];
  const half = Math.floor(maxVisiblePages / 2);

  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, currentPage + half);

  // Adjust the range to ensure the correct number of pages is displayed
  if (end - start + 1 < maxVisiblePages) {
    if (start === 1) {
      end = Math.min(start + maxVisiblePages - 1, totalPages);
    } else if (end === totalPages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
  }

  // Create the pagination array
  for (let i = start; i <= end; i++) {
    pagination.push(i);
  }
  if (maxVisiblePages - currentPage <= half - 1) {
    if (maxVisiblePages - currentPage < half - 1) pagination.unshift('...');
    pagination.unshift(1);
  }
  if (totalPages - currentPage >= half + 1) {
    if (totalPages - currentPage > half + 1) pagination.push('...');
    pagination.push(totalPages);
  }

  return pagination;
};
