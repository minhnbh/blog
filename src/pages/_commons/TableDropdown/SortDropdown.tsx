import React, { ReactNode } from 'react';
import TableDropdown from '.';

export interface ISortDropdownProps {
  columnId: string;
  editableColumns: Record<string, any>;
  target?: string | ReactNode;
  title?: string;
  onSort?: (columnId: string) => void;
  onToggleVisible?: (columnId: string) => void;
}

const SortDropdown: React.FC<ISortDropdownProps> = ({
  columnId,
  target,
  title = 'Column Settings',
  editableColumns,
  onSort = () => {},
  onToggleVisible = () => {}
}) => {
  return (
    <TableDropdown
      {...{
        ...editableColumns,
        groupMenus: [
          {
            groupTitle: title,
            menus: [
              {
                keyEvent: '1',
                label: 'Sort',
                icon: 'arrows-down-up',
                onClick: () => onSort(columnId)
              },
              {
                keyEvent: '2',
                label: 'Hide column',
                icon: 'eye-slash',
                onClick: () => onToggleVisible(columnId)
              }
            ]
          }
        ],
        toggleChildren: target,
        columnId: columnId
      }}
    />
  );
};

export default SortDropdown;
