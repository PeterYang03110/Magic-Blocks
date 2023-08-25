import LINKS from 'utils/constants/links';

const TOP_BAR_MENU = [
  // LINKS.GAMES,
  LINKS.SHOP,
  {
    TITLE: 'Apps',
    HREF: '/',
    CHILDREN: [{ GROUPTITLE: null, LINKS: [LINKS.STAKING, LINKS.CHAT] }],
    // LINKS.LOOTFARMS
  },
  // {
  //   TITLE: 'MABSVERSE',
  //   HREF: '/',
  //   CHILDREN: [
  //     { GROUPTITLE: null, LINKS: [LINKS.MABS] },
  //     { GROUPTITLE: null, LINKS: [LINKS.LAUNCHER] },
  //     { GROUPTITLE: 'AVATAR RPG', LINKS: [LINKS.HEXLAND] },
  //     { GROUPTITLE: 'MABSVERSE GAMES', LINKS: [LINKS.SURVIVAL] },
  //   ],
  // },
];

export default TOP_BAR_MENU;
