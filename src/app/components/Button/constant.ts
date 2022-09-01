const btnVariants = <const>[
  'default',
  'success',
  'primary',
  'secondary',
  'warning',
  'danger',
  'outline-success',
  'outline-primary',
  'outline-secondary',
  'outline-warning',
  'outline-danger',
  'icon-success',
  'icon-primary',
  'icon-secondary',
  'icon-warning',
  'icon-danger',
  'submit',
  'transparent'
];
const btnSizes = <const>['lg', 'sm'];

export type BtnVariants = typeof btnVariants[number];
export type BtnSizes = typeof btnSizes[number];
