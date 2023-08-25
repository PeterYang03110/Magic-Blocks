import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    background: '#fff',
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    cursor: 'pointer',
  },
  selectedRoot: {
    border: `1px solid ${theme.custom.palette.blueLink}`,
    boxShadow: '0px 4px 8px rgba(7, 11, 29, 0.08)',
  },
  text: {
    color: theme.custom.palette.whitePurple,
    fontSize: 18,
    fontWeight: 600,
    WebkitUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',

    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  selectedText: {
    color: theme.custom.palette.blueLink,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: 56,
    background: theme.custom.palette.whitePurple,
    borderRadius: 100,
    marginBottom: 12,
    border: `1px solid ${theme.custom.palette.black30}`,
  },
  selectedIconContainer: {
    background: theme.custom.palette.blueLink,
    border: 'none',
  },
}));

const StepCard = ({ selected, text, children, onClick }) => {
  const classes = useStyles();

  return (
    <div onClick={onClick} className={clsx(selected && classes.selectedRoot, classes.root)}>
      <div className={clsx(selected && classes.selectedIconContainer, classes.iconContainer)}>
        {children}
      </div>
      <Typography className={clsx(selected && classes.selectedText, classes.text)}>
        {text}
      </Typography>
    </div>
  );
};

export default memo(StepCard);
