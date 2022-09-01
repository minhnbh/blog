import React, { useImperativeHandle } from 'react';
import { Table } from 'react-bootstrap';
import { useTable, useSortBy, SortingRule } from 'react-table';
import { ColumnType, GridProps } from './types';
import classnames from 'classnames';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { COLORS } from 'app/constants/common';
import SimpleBar from 'simplebar-react';

const Grid: React.FC<GridProps> = React.forwardRef((props, ref) => {
  const {
    columns,
    data,
    className,
    showIndex,
    cellProps,
    cellHeaderProps,
    cellBodyProps,
    hiddenColumns = [],
    initialSortBy = [],
    indexOffset = 1
  } = props;

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    headerGroups,
    prepareRow,
    setSortBy
  } = useTable(
    {
      columns,
      data,
      initialState: { hiddenColumns, sortBy: initialSortBy }
    },
    useSortBy
  );

  useImperativeHandle(ref, () => ({
    refreshSortBy(sortBy: SortingRule<string>[]) {
      initialSortBy && setSortBy(sortBy);
    }
  }));

  return (
    <SimpleBar>
      <Table className={classnames(className)} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => {
            const { key: rowKey } = headerGroup.getHeaderGroupProps();
            return (
              <tr {...headerGroup.getHeaderGroupProps()} key={rowKey}>
                {showIndex && (
                  <th
                    className={classnames('p-16 th-middle grid-index-column')}
                  >
                    #
                  </th>
                )}
                {headerGroup.headers.map(column => {
                  const {
                    getHeaderProps,
                    getSortByToggleProps,
                    render,
                    isSorted,
                    isSortedDesc,
                    width
                  } = column;
                  const { key: columnKey } = getHeaderProps();
                  return (
                    <th
                      className={classnames('p-16 th-middle', {
                        'sticky-right bg-gray-247': (column as any).isFixedRight
                      })}
                      {...getHeaderProps(getSortByToggleProps())}
                      key={columnKey}
                      {...cellProps}
                      {...cellHeaderProps}
                    >
                      <div
                        className={classnames(
                          'd-flex',
                          (column as any).className
                        )}
                        style={{ width: width }}
                      >
                        {render('Header')}
                        {isSorted ? (
                          <span className="ml-6">
                            {isSortedDesc ? (
                              <FaCaretDown size={14} color={COLORS.DANGER} />
                            ) : (
                              <FaCaretUp size={14} color={COLORS.DANGER} />
                            )}
                          </span>
                        ) : null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            const { key: rowKey } = row?.getRowProps();
            return (
              <tr {...row.getRowProps()} key={rowKey}>
                {showIndex && (
                  <td className={classnames('p-16')}>
                    {rowIndex + 1 + (indexOffset - 1) * 10}
                  </td>
                )}
                {row.cells.map(cell => {
                  const { cellClassName, isFixedRight } =
                    cell.column as ColumnType;
                  const { key: cellKey } = cell.getCellProps();
                  return (
                    <td
                      className={classnames(
                        (cell as any).className,
                        cellClassName,
                        {
                          'sticky-right bg-gray-247': isFixedRight,
                          'p-16': !isFixedRight
                        }
                      )}
                      {...cell.getCellProps()}
                      key={cellKey}
                      {...cellProps}
                      {...cellBodyProps}
                    >
                      <div>{cell.render('Cell')}</div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </SimpleBar>
  );
});

export default Grid;
