import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    background: '#000 !important',
    overflow: 'hidden',
    position: 'relative',
    height: 0,
    zIndex: 100,
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 2,
    color: '#fff',
  },
  frameContainer: {
    left: 0,
    top: 0,
    width: '73vw',
    height: '38.625vw',
    maxHeight: '90vh',
    maxWidth: '160vh',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    position: 'absolute',

    [theme.breakpoints.down('sm')]: {
      height: '46vw',
      width: '90vw',
    },
  },
  frame: {
    width: '100%',
    height: '100%',
  },
}));

const YoutubeEmbed = ({ value, className, embedId, handleOutsideClick, onClose }) => {
  const classes = useStyles({ value });

  return (
    <div className={clsx(classes.root, className)} onClick={handleOutsideClick}>
      <div className={classes.frameContainer}>
        <IconButton edge='end' aria-label='close' className={classes.closeIcon} onClick={onClose}>
          <CloseIcon />
        </IconButton>

        <iframe
          className={classes.frame}
          src={`https://www.youtube.com/embed/${embedId}`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title='Embedded youtube'
        />
      </div>
    </div>
  );
};

export default memo(YoutubeEmbed);
