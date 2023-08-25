import React, { memo } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import GreenCheckCircleFillIcon from 'components/Icons/GreenCheckCircleFillIcon';
const useStyles = makeStyles(() => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    maxHeight: 400,
    overflowY: 'auto'
  },
  wrapContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  img: {
    height: 120,
    padding: '6px',
    '&:hover': {
      background: '#EDEFF5',
    },
  },
  checkIcon: {
    display: 'block',
    position: 'relative',
    bottom: 115,
    left: 85,
    borderRadius: 8,
    height: 24,
    width: 24,
    background: 'white'
  }
}));

const FiefImageList = React.forwardRef(
  ({ items, value, setValue, ...rest }, ref) => {
    const classes = useStyles();
    return (
      items && 
      <div>
        <Box ref={ref} className={clsx(classes.root)} {...rest}>
          <Grid className={classes.wrapContainer}>
            
            {items.map(item => (
              <Grid key='i' item xs={12} sm={3}>
                <div>
                  <img
                    alt='profile'
                    src={item.image}
                    className={classes.img}
                    onClick={() => {setValue(item)}}></img>
                  {
                    item.contractAddress == value.contractAddress && item.chainId == value.chainId && item.tokenId == value.tokenId && 
                    <div className={classes.checkIcon}>
                      <GreenCheckCircleFillIcon style={{margin: '3px'}}/>
                    </div>
                  }
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    );
  },
);

export default memo(FiefImageList);
