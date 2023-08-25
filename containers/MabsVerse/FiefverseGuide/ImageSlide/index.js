import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: ({ backgroundImage }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    height: 1080,
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom center',
    backgroundColor: '#0f0f15',
    [theme.breakpoints.down('xs')]: {
      height: 740,
    },
  }),
}));

const ImageSlide = ({ backgroundImage }) => {
  const classes = useStyles({ backgroundImage });

  return <div className={classes.root} />;
};

export default memo(ImageSlide);
