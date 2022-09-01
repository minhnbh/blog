import If from 'pages/_commons/If';
import React, { useEffect, useMemo, useState } from 'react';
import { default as PaginationBase } from 'react-bootstrap/Pagination';

interface IPaginationProps {
  totalItem?: number;
  pageSize?: number[];
  pageNumber?: number;
  onChangePage?: (page: number) => void;
  onChangePageSize?: (pageSize: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  totalItem = 0,
  pageSize = [10],
  pageNumber = 0,
  onChangePage
}) => {
  const [currentPage, setCurrentPage] = useState<number>(pageNumber);
  const numberDisplay = useMemo(
    () => Math.ceil(totalItem / pageSize[0]),
    [pageSize, totalItem]
  );

  useEffect(() => {
    setCurrentPage(pageNumber);
  }, [pageNumber]);

  const handleChange = (num: number) => {
    if (num < 1 || num > numberDisplay) return;
    setCurrentPage(num);
    onChangePage && onChangePage(num);
  };

  const PageItemView = (num: number) => {
    return (
      <PaginationBase.Item
        key={num}
        active={num === currentPage}
        onClick={_ => handleChange(num)}
      >
        <div className="fs-14 fw-400 px-4">{num}</div>
      </PaginationBase.Item>
    );
  };

  return (
    <div className="py-16 flex-center">
      <If condition={numberDisplay > 1}>
        <PaginationBase className="flex-center">
          <PaginationBase.First
            className="fs-14"
            onClick={_ => handleChange(1)}
          />
          <PaginationBase.Prev
            className="fs-14"
            onClick={_ => handleChange(currentPage - 1)}
          />

          {PageItemView(1)}

          <If condition={numberDisplay > 2 && numberDisplay < 10}>
            {Array.from({ length: numberDisplay - 2 }).map((_, index) =>
              PageItemView(index + 2)
            )}
          </If>

          <If condition={numberDisplay >= 10}>
            <If condition={currentPage > 4}>
              <PaginationBase.Ellipsis className="fs-14" />
            </If>
            {Array.from({ length: 5 }).map((_, index) => {
              const pageIndex = currentPage + index - 2;
              if (pageIndex <= 1 || pageIndex >= numberDisplay) return;
              return PageItemView(pageIndex);
            })}
            <If condition={currentPage < numberDisplay - 3}>
              <PaginationBase.Ellipsis className="fs-14" />
            </If>
          </If>

          {PageItemView(numberDisplay)}

          <PaginationBase.Next
            className="fs-14"
            onClick={_ => handleChange(currentPage + 1)}
          />
          <PaginationBase.Last
            className="fs-14"
            onClick={_ => handleChange(numberDisplay)}
          />
        </PaginationBase>
      </If>
    </div>
  );
};

export default Pagination;
