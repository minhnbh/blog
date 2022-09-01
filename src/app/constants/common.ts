import { StylesConfig } from 'react-select';

export const ALPHA_REGEX = /[^a-z]/gi;
export const ALPHA_SPACE_REGEX = /[^a-z\s]/gi;
export const NUMERIC_REGEX = /[^0-9]/gi;
export const FLOAT_NUMBER_REGEX = /^$|[+-]?([0-9]*[.])?[0-9]+/gm;

export enum COLORS {
  GRAY_D01 = '#25252e',
  GRAY_D02 = '#282730',
  GRAY_D03 = '#15151c',
  GRAY_D04 = '#333940',
  GRAY_L01 = '#9f9fac',
  MAIN_ORANGE = '#f35818',
  WHITE = '#FFFFFF',
  GREEN_L01 = '#13A66F',
  PRIMARY = '#0d6efd',
  SUCCESS = '#198754',
  SECONDARY = '#6c757d',
  DANGER = '#dc3545',
  WARNING = '#ffc107',
  PRIMARY_RED = '#ae1c22'
}

export const MONTHS_STRING = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const selectStyles: Partial<StylesConfig> = {
  menu: styles => ({
    ...styles,
    backgroundColor: COLORS.WHITE
  }),
  container: (styles, { isFocused }) => ({
    ...styles,
    outline: 'none',
    boxShadow: 'none'
  }),
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: COLORS.WHITE,
    borderColor: isFocused ? COLORS.PRIMARY : COLORS.GRAY_L01,
    outline: 'none',
    boxShadow: 'none',
    minHeight: '4.3rem',
    '&:hover': {
      borderColor: COLORS.PRIMARY
    },
    '&:not(:hover)': {
      borderColor: isFocused ? COLORS.PRIMARY : COLORS.GRAY_L01
    }
  }),
  input: styles => ({
    ...styles,
    color: COLORS.GRAY_D01,
    outline: 'none',
    boxShadow: 'none',
    fontSize: '1.4rem',
    lineHeight: '1.6rem',
    fontWeight: 500,
    paddingLeft: '1.6rem',
    padding: 0,
    margin: '0.15rem'
  }),
  placeholder: styles => ({
    ...styles,
    fontSize: '1.4rem',
    lineHeight: '1.6rem',
    fontWeight: 500,
    color: COLORS.GRAY_L01
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? COLORS.PRIMARY_RED : COLORS.WHITE,
    color: isFocused ? COLORS.WHITE : COLORS.GRAY_D01,
    borderColor: COLORS.GRAY_D01,
    fontSize: '1.4rem',
    lineHeight: '1.6rem',
    fontWeight: 500
  }),
  valueContainer: (styles, { isMulti }) => ({
    ...styles,
    padding: isMulti ? '0.6rem 0.8rem' : '1.1rem 1.6rem'
  }),
  singleValue: styles => ({
    ...styles,
    color: COLORS.GRAY_D01,
    fontSize: '1.4rem',
    lineHeight: '1.6rem',
    fontWeight: 500
  }),
  multiValue: styles => ({
    ...styles,
    backgroundColor: COLORS.PRIMARY_RED,
    borderRadius: 4,
    padding: '0.6rem',
    paddingRight: 0,
    width: 'auto'
  }),
  multiValueLabel: styles => ({
    ...styles,
    fontSize: '1.3rem',
    lineHeight: '1.5rem',
    fontWeight: 600,
    color: COLORS.WHITE,
    width: 'auto',
    padding: 0
  }),
  multiValueRemove: styles => ({
    ...styles,
    fontSize: '1.2rem',
    color: 'white',
    '&:hover': {
      backgroundColor: COLORS.GRAY_L01
    }
  }),
  indicatorSeparator: () => ({
    width: 0
  }),
  menuPortal: styles => ({
    ...styles,
    zIndex: 2000
  }),
  noOptionsMessage: styles => ({
    ...styles,
    fontSize: '1.4rem'
  })
};

export const SIM_STATUS_TEXT = [
  'Đang bán',
  'Đã xóa',
  'Đã bán',
  'Đang trao đổi',
  'Chờ duyệt',
  'Đã ẩn',
  'Đang giữ'
];

export const SIM_STATUSES: RefDataValue[] = [
  {
    id: 1,
    value: '1',
    description: 'Đang bán'
  },
  {
    id: 2,
    value: '2',
    description: 'Đã xóa'
  },
  {
    id: 3,
    value: '3',
    description: 'Đã bán'
  },
  {
    id: 4,
    value: '4',
    description: 'Đang trao đổi'
  },
  {
    id: 5,
    value: '5',
    description: 'Chờ duyệt'
  },
  {
    id: 6,
    value: '6',
    description: 'Đã ẩn'
  },
  {
    id: 7,
    value: '7',
    description: 'Đang giữ'
  }
];

export const SIM_STATUS_CODE = {
  ACTIVE: 1,
  REMOVED: 2,
  SOLD: 3,
  TRADING: 4,
  PENDING: 5,
  HIDE: 6,
  HOLD: 7
};
