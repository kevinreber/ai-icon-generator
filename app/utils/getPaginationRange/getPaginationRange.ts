/**
  @description
  Gets the Pagination Range for the total number of items displayed in
  a Data Table component with pagination.

  The `startRange` and `endRange` are to be used like the examples below

  Ex:
  - Showing numbers `startRange` - `endRange` of X items
  - Showing numbers 1 - 10 of 100 items
  - Showing numbers 1201 - 1240 of 1240 items


  Reference: https://stackoverflow.com/questions/70999882/pagination-calculation-result-per-page-calculation-after-sorting
 */
export const getPaginationRange = (
  currentPage = 0,
  pageSize = 0,
  totalItems = 0,
) => {
  const startRange = (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, totalItems);

  return { startRange, endRange };
};
