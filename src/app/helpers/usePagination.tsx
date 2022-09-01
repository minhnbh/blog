import { isUndefined } from 'lodash';
import { useEffect, useState } from 'react';

const PAGE_SIZE_COMMON: number[] = [10, 25, 50];

interface pageSizeInfo {
  page: number;
  size: number;
}

export const usePagination = <T,>(
  list?: Array<T>,
  pageSize = PAGE_SIZE_COMMON,
  curPage?: number
) => {
  const [total, setTotal] = useState(list?.length);
  const [currentPage, setCurrentPage] = useState(curPage ?? 1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize[0]);
  const [gridData, setGridData] = useState<T[]>([]);

  const onPageChange = (pageSelected: number) => {
    setCurrentPage(pageSelected);
  };

  const onPageSizeChange = (pageInfo: pageSizeInfo) => {
    setCurrentPage(1);
    setCurrentPageSize(pageInfo.size);
  };

  useEffect(() => {
    if (!isUndefined(list)) {
      const start = currentPageSize * (currentPage - 1);
      const end = currentPageSize * currentPage;
      const data = list.slice(start, end);
      if (list.length > 0 && data.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
        return;
      }
      setTotal(list.length);
      setGridData(data);
    }
  }, [currentPage, currentPageSize, list]);

  return {
    total,
    currentPage,
    pageSize,
    currentPageSize,
    gridData,
    onPageChange,
    onPageSizeChange,
    setCurrentPage,
    setCurrentPageSize
  };
};
