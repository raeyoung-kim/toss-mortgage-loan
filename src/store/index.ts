import { RegionTreeNode } from 'pages/remotes';
import { atom } from 'recoil';

export type AdressData = {
  main: string;
  gu: string;
  dong: string;
  mainChildren: RegionTreeNode[];
  guChildren: RegionTreeNode[];
  donChildren: RegionTreeNode[];
};

export const addressData = atom<AdressData>({
  key: 'address',
  default: {
    main: '',
    gu: '',
    dong: '',
    mainChildren: [],
    guChildren: [],
    donChildren: [],
  },
});
