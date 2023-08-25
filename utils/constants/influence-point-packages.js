import {
  IP_GROUP_10000_ICON_PATH,
  IP_GROUP_5000_ICON_PATH,
  IP_GROUP_25000_ICON_PATH,
  IP_GROUP_50000_ICON_PATH,
} from 'utils/constants/image-paths';

const INFLUENCE_POINT_PACKAGES = [
  {
    name: '5000IPBUNDLE',
    amount: 5000,
    bonus: 0,
    bonusPercent: 0,
    price: 0.03,
    image: IP_GROUP_5000_ICON_PATH,
  },
  {
    name: '10000IPBUNDLE',
    amount: 10000,
    bonus: 1000,
    bonusPercent: 0.1,
    price: 0.06,
    image: IP_GROUP_10000_ICON_PATH,
  },
  {
    name: '25000IPBUNDLE',
    amount: 25000,
    bonus: 3750,
    bonusPercent: 0.15,
    price: 0.15,
    image: IP_GROUP_25000_ICON_PATH,
  },
  {
    name: '50000IPBUNDLE',
    amount: 50000,
    bonus: 10000,
    bonusPercent: 0.2,
    price: 0.3,
    image: IP_GROUP_50000_ICON_PATH,
  },
];

export default INFLUENCE_POINT_PACKAGES;
