import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { getAssetTypeLabel } from 'utils/helpers/assetType';

import { ASSETS_EMPTY_STATE_IMAGE_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  root: {},
  emptyWrapper: {
    background: '#EDEFF5',
    borderRadius: 6,
    padding: theme.spacing(5),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2.5),
    },
  },
  emptyFirstLabel: {
    fontFamily: 'pedestria-mvb',
    fontSize: theme.spacing(6),
    fontWeight: 700,
    lineHeight: '68px',
    color: '#1F182A',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(5),
      lineHeight: '48px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2.5),
      lineHeight: '28px',
      marginBottom: theme.spacing(0),
      textAlign: 'center',
    },
  },
  emptySecondLabel: {
    color: '#8F95B2',
    marginBottom: 0,
  },
  imageWrapper: {
    '& img': {
      width: '90%',

      [theme.breakpoints.down('sm')]: {
        maxWidth: theme.spacing(32),
      },
    },
  },
}));

const EmptyAssetState = ({ assetType }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.emptyWrapper} alignItems='center'>
        <Grid
          container
          item
          alignItems='center'
          justifyContent='center'
          className={classes.imageWrapper}
          xs={12}
          sm={12}
          md={6}
          lg={6}>
          <img src={ASSETS_EMPTY_STATE_IMAGE_PATH} />
        </Grid>
        <Grid item md={6} lg={6} xs={12} sm={12}>
          <Typography className={classes.emptyFirstLabel}>
            There are no {getAssetTypeLabel(assetType).toLowerCase()} in the shop
          </Typography>
          <Typography className={clsx(classes.emptyFirstLabel, classes.emptySecondLabel)}>
            Wait for them!
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(EmptyAssetState);
