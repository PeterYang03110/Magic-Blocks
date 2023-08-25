import { memo, useRef, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Typography, useMediaQuery } from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import clsx from 'clsx';

import ImageSlide from './ImageSlide';
import SliderLeftIcon from 'components/Icons/SliderLeftIcon';
import SliderRightIcon from 'components/Icons/SliderRightIcon';
import {
  FIEFVERSE_EXPLORE_BACKGROUND_IMAGE_PATH,
  FIEFVERSE_FIGHT_BACKGROUND_IMAGE_PATH,
  FIEFVERSE_CHILL_BACKGROUND_IMAGE_PATH,
  FIEFVERSE_TRADE_BACKGROUND_IMAGE_PATH,
  FIEFVERSE_BUILD_BACKGROUND_IMAGE_PATH,
  FIEFVERSE_EARN_BACKGROUND_IMAGE_PATH,
} from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  container: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    maxWidth: theme.custom.layout.maxDeskWidth,
    padding: theme.spacing(8, 2.5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 2.5),
    },
  },
  infoCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
    maxWidth: 413,
    width: '100%',
    padding: theme.spacing(2, 3),
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(2),
    },
  },
  progressBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  progressItem: {
    borderRadius: 4,
    height: 4,
    width: '100%',
    background: '#dbe2ff',
  },
  progressSelectedItem: {
    background: '#4D6EFF',
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    fontSize: 48,
    fontFamily: 'pedestria-mvb,sans-serif',
    color: '#1F182A',
    textShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
    '& span': {
      fontSize: 18,
      fontFamily: 'Inter',
      fontWeight: 500,
      color: '#474D66',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
      '& span': {
        fontSize: 16,
      },
    },
  },
  iconContainer: {
    display: 'flex',
    gap: 24,
    [theme.breakpoints.down('sm')]: {
      gap: 16,
    },
  },
  icon: {
    cursor: 'pointer',
  },
}));

const FIEFVERSE_GUIDES = [
  {
    step: 0,
    title: 'Explore',
    description: 'Travel to the farthest reaches of the MabsVerse and discover hidden secrets',
    backgroundImage: FIEFVERSE_EXPLORE_BACKGROUND_IMAGE_PATH,
  },
  {
    step: 1,
    title: 'Fight',
    description: 'Battle terrifying creatures across treacherous Worlds',
    backgroundImage: FIEFVERSE_FIGHT_BACKGROUND_IMAGE_PATH,
  },
  {
    step: 2,
    title: 'Chill',
    description: 'Relax with your friends while collecting items to build your inventory',
    backgroundImage: FIEFVERSE_CHILL_BACKGROUND_IMAGE_PATH,
  },
  {
    step: 3,
    title: 'Trade',
    description: 'Become a tycoon and dominate the auction house economy',
    backgroundImage: FIEFVERSE_TRADE_BACKGROUND_IMAGE_PATH,
  },
  {
    step: 4,
    title: 'Build',
    description: 'Collect blueprints and materials to craft a variety of items',
    backgroundImage: FIEFVERSE_BUILD_BACKGROUND_IMAGE_PATH,
  },
  {
    step: 5,
    title: 'Collect',
    description: 'Undertake quests, defeat enemies, and collect sweet loot',
    backgroundImage: FIEFVERSE_EARN_BACKGROUND_IMAGE_PATH,
  },
];

const FiefverseGuide = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'), { defaultMatches: true });

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedGuide = FIEFVERSE_GUIDES[currentIndex];

  return (
    <main className={classes.root}>
      <Swiper
        modules={[EffectFade, Navigation]}
        effect='fade'
        onInit={swiper => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        onRealIndexChange={swiper => setCurrentIndex(swiper?.activeIndex || 0)}>
        {FIEFVERSE_GUIDES.map(guide => (
          <SwiperSlide key={guide.step}>
            <ImageSlide backgroundImage={guide.backgroundImage} />
          </SwiperSlide>
        ))}

        <div className={classes.container}>
          <div className={classes.infoContainer}>
            <Card className={classes.infoCard}>
              <div className={classes.progressBar}>
                {FIEFVERSE_GUIDES.map(guide => (
                  <div
                    key={guide.step}
                    className={clsx(classes.progressItem, {
                      [classes.progressSelectedItem]: guide.step === currentIndex,
                    })}
                  />
                ))}
              </div>

              <Typography className={classes.title}>
                {selectedGuide.title}
                <span>{selectedGuide.description}</span>
              </Typography>

              <div className={classes.iconContainer}>
                <div ref={navigationPrevRef} className={classes.icon}>
                  <SliderLeftIcon size={isSm ? 36 : 56} blackBorder />
                </div>
                <div ref={navigationNextRef} className={classes.icon}>
                  <SliderRightIcon size={isSm ? 36 : 56} blackBorder />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Swiper>
    </main>
  );
};

export default memo(FiefverseGuide);
