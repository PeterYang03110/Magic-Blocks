import React, { memo } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
  },
  statusBox: {
    background: '#00D68F',
    borderColor: '#00D68F',
    width: '63px',
    height: '8px',
    borderRadius: '8px'
  },
  disabled: {
    background: '#D8DAE5',
    borderColor: '#D8DAE5',
    width: '63px',
    height: '8px',
    borderRadius: '8px'
  },
}));

const StatusBar = React.forwardRef(
  ({ status = 10, className }, ref) => {
    const classes = useStyles();

    return (
      <div>
        <Box ref={ref} className={clsx(classes.root, className)}>
          <Box className={classes.container}>
            {[...Array(10)].map((k, i) =>
              status > i ?
              <Box className={classes.statusBox}/> : 
              <Box className={classes.disabled}/>
            )}
          </Box>
        </Box>
      </div>
    );
  },
);

export default memo(StatusBar);
