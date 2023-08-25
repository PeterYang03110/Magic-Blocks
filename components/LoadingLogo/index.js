import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import { LOGO_IMAGE_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    height: 150,
  },
  spinner: {
    position: 'absolute',
    borderRadius: '50%',
    border: '2px solid #EDDABC',
    boxShadow: '0px 10.2992px 34.3307px rgba(7, 11, 29, 0.16)',
  },
  circle: {
    stroke: 'url(#linearColors)',
  },
}));

const size = 165;

const LoadingLogo = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CircularProgress
        classes={{
          circle: classes.circle,
        }}
        size={size}
      />
      <svg width={size} height={size} className={classes.spinner}>
        <linearGradient id='linearColors' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='20%' stopColor='#D6A862' />
          <stop offset='90%' stopColor='#ffffff80' />
        </linearGradient>
      </svg>
      <img alt='logo' src={LOGO_IMAGE_PATH} className={classes.logo} />
    </div>
  );
};

export default memo(LoadingLogo);
