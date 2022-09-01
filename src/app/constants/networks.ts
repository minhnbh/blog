export const NETWORKS: {
  id: number;
  name: string;
  phoneNumberPrefix: string[];
}[] = [
  {
    id: 1,
    name: 'Viettel',
    phoneNumberPrefix: [
      '086',
      '096',
      '097',
      '098',
      '032',
      '033',
      '034',
      '035',
      '036',
      '037',
      '038',
      '039'
    ]
  },
  {
    id: 2,
    name: 'Vinaphone',
    phoneNumberPrefix: [
      '088',
      '091',
      '094',
      '098',
      '081',
      '082',
      '083',
      '084',
      '085'
    ]
  },
  {
    id: 3,
    name: 'Mobifone',
    phoneNumberPrefix: ['089', '090', '093', '070', '076', '077', '078', '079']
  },
  {
    id: 4,
    name: 'Gmobile',
    phoneNumberPrefix: ['099', '059']
  },
  {
    id: 5,
    name: 'Vietnamobile',
    phoneNumberPrefix: ['092', '056', '058']
  }
];

export const NETWORKS_BY_ID: Record<string, string> = {
  '1': 'Viettel',
  '2': 'Vina',
  '3': 'Mobifone',
  '4': 'Gmobile',
  '5': 'Vietnamobile'
};
