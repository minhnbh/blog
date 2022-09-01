export const PAYMENT_METHODS: RefDataValue[] = [
  {
    id: 1,
    value: 'prepaid',
    description: 'Trả trước'
  },
  {
    id: 2,
    value: 'postpaid',
    description: 'Trả sau'
  }
];

export const PAYMENT_METHODS_BY_ID = {
  '1': 'Trả trước',
  '2': 'Trả sau'
};

export const PAYMENT_METHODS_BY_KEY: Record<string, string> = {
  prepaid: 'Trả trước',
  postpaid: 'Trả sau'
};
