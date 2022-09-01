import { HTMLAttributes } from 'react';
import { Column, SortingRule } from 'react-table';

export type ColumnType<T extends Record<string, any> = Record<string, any>> = {
  id: string;
  className?: string;
  cellClassName?: string;
  width?: number;
  columns?: ColumnType<T>[];
  isFixedRight?: boolean;
  isFixedLeft?: boolean;
} & Column<T>;

export interface GridProps {
  ref?: React.ForwardedRef<any>;
  data: any[];
  columns: ColumnType[] | ColumnType<any>[];
  className?: string;
  showIndex?: boolean;
  cellProps?: HTMLAttributes<HTMLElement>;
  cellHeaderProps?: HTMLAttributes<HTMLElement>;
  cellBodyProps?: HTMLAttributes<HTMLElement>;
  cellFooterProps?: HTMLAttributes<HTMLElement>;
  hiddenColumns?: string[];
  initialSortBy?: SortingRule<string>[];
  indexOffset?: number;
  sortBy?: Array<SortType>;
  onSortChange?: (sort: SortType) => void;
}

export interface SortType {
  id: string;
  order?: 'asc' | 'desc' | undefined;
}
