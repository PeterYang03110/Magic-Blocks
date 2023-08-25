import { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

import { ETHSCAN_URL, CONTRACTS } from 'config';
import { FAQ_ICON_PATH, BLACK_DOT_FRAME_IMAGE_PATH } from 'utils/constants/image-paths';
import FaqAccordion from './FaqAccordion';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(10, 3),
    background: '#FFFAF1',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(6, 3),
    },
  },
  container: {
    display: 'flex',
    maxWidth: theme.custom.layout.maxDeskWidth,
    width: '100%',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    minHeight: 730,
  },
  title: {
    fontSize: 88,
    fontFamily: 'pedestria-mvb,sans-serif',
    color: '#0B0B0B',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: 64,
      lineHeight: '66px',
      textAlign: 'center',
      marginBottom: theme.spacing(0),
    },
  },
  image: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    maxWidth: 539,
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      maxWidth: 420,
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: 340,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  frame: {
    position: 'absolute',
    bottom: -32,
    height: 72,
    width: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      bottom: -23,
      height: 40,
    },
  },
}));

const FAQS = [
  {
    title: 'What Is the Magic Blocks Protocol?',
    description: (
      <>
        Magic Blocks protocol is a suite of decentralized applications that sits above the MabsVerse, an
        open-world voxel RPG.
        <br />
        <br />
        Magic Blocks Protocol dapps unlock utility and liquidity for in-game items while the MabsVerse
        drives engagement and transactional activity to generate a sustainable source of yield for
        these dapps.
      </>
    ),
  },
  {
    title: 'What Is the Magic Blocks Token?',
    description: (
      <>
        {
          "The Magic Blocks Token (MABS”) is a utility token that ties into Magic Block's decentralized applications. "
        }
        <a href={`${ETHSCAN_URL}/token/${CONTRACTS.MABS}`} target='_blank' rel='noreferrer'>
          You can view the token contract here.
        </a>
      </>
    ),
  },
  {
    title: 'What are Magic Blocks Avatars?',
    description: (
      <>
        MABS Avatars are the playable characters within the MabsVerse. These Avatars are born to
        specific Worlds found across the MabsVerse and can be fully customized with reward-producing
        items.
      </>
    ),
  },
  {
    title: 'What Is the Mabsfverse?',
    description: (
      <>
        {`MabsVerse is the gaming layer of the Magic Blocks Protocol (pure DeFi is boring). It’s an open world
        RPG built around an ever-expanding collection of explorable worlds. Players can travel to
        different locations based on their interests and equipped Avatar.`}
        <br />
        <br />
        {`We’re tired of web3 metaverses with nothing to do and no structured economic layer. We
        should be able to explore, adventure, and visit a host of experiences while collecting
        rewards that seamlessly plug into other web3 applications. With the MabsVerse, you can do
        all of that and more.`}
        <br />
        <ul>
          <li>Explore dungeons and fight enemies to get awesome loot (NFTs and IP)</li>
          <li>Join competitive multiplayer game modes and win prizes</li>
          <li>Build up your corner of the MabsVerse (literally)</li>
          <li>Hang out with friends in one of the many Chillzones</li>
          <li>Use the gasless auction house to max bid on your favorite weapons</li>
        </ul>
        ...the possibilities are endless.
        <br />
        <br />
        Actions and demand for IP within the MabsVerse are what ultimately tie our decentralized
        applications together.
      </>
    ),
  },
  {
    title: 'What Are Influence Points?',
    description: (
      <>
        {`Influence Points ("IP") power gas-free activities across the Magic Blocks platform. Users can
        acquire IP by staking MABS, outfitting a Magic Blocks Avatar, playing in the MabsVerse,
        participating in Magic Blocks dapps, or through direct purchase in the Magic Blocks Shop.`}
        <br />
        <br />
        IP can be used for a variety of activities, including purchasing items for your Magic Blocks Avatar,
        unlocking Loot Farms for your metaverse assets, and more.
        <br />
        <br />
        IP is attached to your wallet and is non-transferable. All MabsVerse items purchased with IP
        are minted to your wallet as an NFT and in time, we will introduce off-chain inventory
        management to allow for greater flexibility for trading within the MabsVerse.
      </>
    ),
  },
  {
    title: 'What Networks Does Magic Blocks Protocol Support?',
    description: 'Magic Blocks Protocol currently uses the Ethereum network as our settlement layer.',
  },
];

const HomeFAQ = () => {
  const classes = useStyles();

  const [selectedFaq, setSelectedFaq] = useState(FAQS[0]);

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4} lg={3}>
            <Typography className={classes.title}>FAQs</Typography>
            <img alt='faq' src={FAQ_ICON_PATH} className={classes.image} />
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <div className={classes.infoContainer}>
              {FAQS.map(faq => (
                <FaqAccordion
                  key={faq.title}
                  faq={faq}
                  selected={selectedFaq.title === faq.title}
                  onSelect={() => setSelectedFaq(faq)}
                />
              ))}
            </div>
          </Grid>
        </Grid>
      </div>

      <img alt='bottom-frame' src={BLACK_DOT_FRAME_IMAGE_PATH} className={classes.frame} />
    </main>
  );
};

export default memo(HomeFAQ);
