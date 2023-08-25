import SettingIcon from 'components/Icons/SettingIcon';
import InventoryIcon from 'components/Icons/InventoryIcon';
import AddFriendIcon from 'components/Icons/AddFriendIcon';
import LINKS from 'utils/constants/links';

const PROFILE_MENU = [
  { ...LINKS.PROFILE, ICON: <SettingIcon /> },
  { ...LINKS.INVENTORY, ICON: <InventoryIcon /> },
  { ...LINKS.ADD_FRIENDS, ICON: <AddFriendIcon /> },
];

export default PROFILE_MENU;
