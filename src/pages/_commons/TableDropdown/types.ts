import { ReactNode } from 'react';
import { IconNames } from '../../../app/components/Icon';

export declare type AlignDirection = 'start' | 'end';
export declare type ResponsiveAlignProp =
  | {
      sm: AlignDirection;
    }
  | {
      md: AlignDirection;
    }
  | {
      lg: AlignDirection;
    }
  | {
      xl: AlignDirection;
    }
  | {
      xxl: AlignDirection;
    };

export declare type AlignType = AlignDirection | ResponsiveAlignProp;
export interface TableDropdownProps {
  toggleChildren: ReactNode;
  dropdownHeaderTitle?: string;
  groupMenus: GroupMenu[];
  toggleClassName?: string;
  size?: 'small' | 'medium';
  autoClose?: boolean | 'outside' | 'inside';
  align?: AlignType;
  columnId?: string;
  hiddenColumns?: string[];
  onClick?: (localHiddenColumns: string[]) => void;
}

export interface MenuItem {
  keyEvent: string;
  label: string;
  icon?: IconNames;
  onClick?: (columnId: string) => void;
}

export interface GroupMenu {
  groupTitle?: string;
  menus: MenuItem[];
  multipleChoice?: boolean;
}

export interface InlineDropdownMenuProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  labeledBy?: string;
}

export interface InlineDropdownToggleProps {
  children?: React.ReactNode;
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};
}

export interface DropdownMenuProps {
  groupMenu: GroupMenu;
  hiddenColumns?: string[];
}
