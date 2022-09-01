import { ReactElement } from 'react';

export interface InlineDropdownProps {
  label: string;
  autoClose?: boolean | 'outside' | 'inside';
  allowAll?: boolean;
  dataField?: string;
  values?: MagicKeyValue[];
  footer?: ReactElement | null;
  onChange?: (values: MagicKeyValue[]) => void;
}

export type InlineDropdownMenuProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  labeledBy?: string;
  drop?: string;
};

export type InlineDropdownToggleProps = {
  children?: React.ReactNode;
  className: string;
  drop?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};
};
