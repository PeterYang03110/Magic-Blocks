import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from 'react-slick';
import { use100vh } from 'react-div-100vh';

import StakingSlide from './StakingSlide';
import FiefverseSlide from './FiefverseSlide';
import LootfarmSlide from './LootfarmSlide';
import CreateUserSlide from './CreateUserSlide';
import SliderLeftIcon from 'components/Icons/SliderLeftIcon';
import SliderRightIcon from 'components/Icons/SliderRightIcon';
import { ORANGE_DOT_FRAME_IMAGE_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  root: ({ deviceHeight }) => ({
    position: 'relative',
    '& .slick-slider': {
      display: 'flex',
      justifyContent: 'center',
      height: `calc(${deviceHeight} - ${theme.custom.layout.topAppBarHeight}px)`,
      [theme.breakpoints.down('xs')]: {
        height: theme.custom.layout.minMobileHeight,
      },
    },
    '& .slick-arrow': {
      [theme.breakpoints.down('md')]: {
        display: 'none !important',
      },
    },
    '& .slick-prev:before': {
      display: 'none',
    },
    '& .slick-next:before': {
      display: 'none',
    },
    '& .slick-dots': {
      bottom: 48,
      borderRadius: 6,
      background: 'rgba(11, 11, 11, 0.6)',
      boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
      border: `1px solid #a4d1fd`,
      backdropFilter: 'blur(3.5px)',
      padding: theme.spacing(1),
      width: 'fit-content',
      [theme.breakpoints.down('sm')]: {
        bottom: 16,
      },
      '& li': {
        width: 16,
        height: 14,
        [theme.breakpoints.down('sm')]: {
          width: 12,
          height: 12,
        },
      },
      '& .slick-active': {
        '& div': {
          background: '#FFFFFF',
        },
      },
    },
  }),
  dot: {
    borderRadius: 30,
    color: 'white',
    width: 16,
    height: 16,
    background: 'rgba(143, 149, 178, 0.5)',
    '&:hover': {
      opacity: 0.4,
    },
    [theme.breakpoints.down('sm')]: {
      width: 12,
      height: 12,
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

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        position: 'absolute',
        right: 110,
        zIndex: 10,
      }}
      onClick={onClick}>
      <SliderRightIcon size={56} />
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        position: 'absolute',
        left: 70,
        zIndex: 10,
      }}
      onClick={onClick}>
      <SliderLeftIcon size={56} />
    </div>
  );
}

const HomeHero = () => {
  const deviceHeight = use100vh();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 950 ? 950 : deviceHeight}px` : '100vh',
  });

  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    speed: 500,
    dots: true,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: 'slick-dots slick-thumb',
    customPaging: () => <div className={classes.dot} />,
  };

  return (
    <main className={classes.root}>
      <Slider {...settings}>
        <div>
          <StakingSlide />
        </div>
        <div>
          <FiefverseSlide />
        </div>
        <div>
          <LootfarmSlide />
        </div>
        <div>
          <CreateUserSlide/>
        </div>
      </Slider>
      <img alt='bottom-frame' src={ORANGE_DOT_FRAME_IMAGE_PATH} className={classes.frame} />
    </main>
  );
};

export default memo(HomeHero);
