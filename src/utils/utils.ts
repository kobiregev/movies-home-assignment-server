

export function getPagination(page: number, totalResults: number, limit = 10) {
  return {
    totalResults: totalResults,
    currentPage: page,
    startPage: 1,
    totalPages: Math.ceil(totalResults / limit),
  };
}
