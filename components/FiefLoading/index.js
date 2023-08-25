import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: props => ({
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: props.height ? props.height : '100vh',
  }),
  spinner: {
    position: 'absolute',
    borderRadius: '50%',
  },
  circle: {
    stroke: 'url(#linearColors)',
  },
}));

const FiefLoading = ({ height, size = 200 }) => {
  const classes = useStyles({ height });

  return (
    <div className={classes.root}>
      <CircularProgress
        classes={{
          circle: classes.circle,
        }}
        size={size}
      />
      <svg width={size} height={size} className={classes.spinner}>
        <linearGradient id='linearColors' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#c6dffa' />
          <stop offset='30%' stopColor='#8c97f4' />
          <stop offset='60%' stopColor='#d5f3fc' />
          <stop offset='90%' stopColor='#f997fe' />
        </linearGradient>
      </svg>
    </div>
  );
};

export default memo(FiefLoading);
