import { memo, useState, useMemo } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Divider, Grid, Typography, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';

import AssetItem from './AssetItem';
import EmptyAssetState from './EmptyAssetState';
import AssetsPagination, { useAssetsPagination, sliceData } from './AssetsPagination';
import { useAsset } from 'contexts/asset-context';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import AssetOptionIcon from 'components/Icons/AssetOptionIcon';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import ASSET_TYPES from 'utils/constants/asset-types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1800,
    padding: theme.spacing(10, 0),
  },
  title: {
    fontSize: 64,
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    lineHeight: '56px',
    textTransform: 'uppercase',
    color: '#1F182A',
    lineHeight: 1.2,
    textShadow: '0px 2.5px 2px rgba(7, 11, 29, 0.3)',
    marginBottom: theme.spacing(6),
    '& span': {
      color: '#1F182A',
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
      marginBottom: theme.spacing(3),
    },
  },
  subTitle: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1,
    textTransform: 'uppercase',
    color: '#1F182A',
    padding: theme.spacing(3),
    borderRadius: 6,
    background: '#FFFFFF',
    border: '1px solid #8F95B2',
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  container: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: 40,
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  assets: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  btnGroup: {
    width: '100%',
    borderColor: '#F97326',
    marginBottom: theme.spacing(2),

    '& button': {
      width: '50%',
      color: '#1F182A',
      fontFamily: 'pedestria-mvb',
      fontSize: theme.spacing(3),
      fontWeight: 700,
      justifyContent: 'flex-start',
      borderColor: '#F97326',
      height: theme.spacing(6.5),

      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(2.5),
        width: '100%',
      },
    },
  },
  button: {
    width: '100%',
    background: 'white',
    color: '#797FF2',
    border: '2px solid #797FF2',
    borderRadius: 6,
    height: 70,
    fontSize: theme.spacing(4),
    lineHeight: 1.4,
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '&:hover': {
      background: 'linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
      border: 'none',
      color: 'white',
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
      lineHeight: '34px',
      height: 56,
    },
  },
  buttonDisabled: {
    background: '#FFFFFF !important',
    border: '2px solid #D8DAE5 !important',
    color: '#D8DAE5 !important',
  },
  activeAssetType: {
    background: 'linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
    border: 'none',
    color: 'white',
  },
  icon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  filters: {
    gap: theme.spacing(1),
  },
  filterLabel: {
    fontWeight: 500,
    color: '#1F182A',
    fontSize: 18,
    lineHeight: 1.6,
    marginBottom: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2),
      lineHeight: '24px',
      marginBottom: theme.spacing(2),
    },
  },
  filterItem: {
    border: '1px solid #D8DAE5',
    background: '#EDEFF5',
    borderRadius: theme.spacing(0.75),
    fontsize: theme.spacing(2),
    fontWeight: 500,
    color: '#1F182A',
    lineHeight: 1.5,
    padding: theme.spacing(0.5, 1),
    cursor: 'pointer',

    '&:hover': {
      background: '#D8DAE5',
      opacity: 1,
    },
  },
  activeFilter: {
    background: '#1F182A !important',
    color: 'white',
    opacity: 1,
  },
  disabled: {
    background: '#fff !important',
    opacity: '0.4 !important',
    color: '#1F182A !important',
    cursor: 'unset',
  },
  card: {
    width: '100%',
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  divider: {
    background: '#D8DAE5',
  },
}));

const FiefverseShop = () => {
  const classes = useStyles();
  const [assetType, setAssetType] = useState('avatar');
  const [filter, setFilter] = useState('BLUEPRINT_RECIPE');
  const { sales } = useAsset();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'), { defaultMatches: true });
  const isXs = useMediaQuery(theme.breakpoints.down('xs'), { defaultMatches: true });
  const { activePage, onSetActivePage, onSetItemsPerPage } = useAssetsPagination(isXs ? 3 : 6);
  const itemsPerPage = isXs ? 3 : 6;

  const handleChangeAssetType = assetType => () => {
    setAssetType(assetType);
  };

  const handleChangeFilter = filter => () => {
    setFilter(filter);
  };

  const filteredSales = useMemo(() => {
    const sortedSales = [...sales];
    sortedSales.sort((sale1, sale2) => sale2.discountPercentage === '100' ? 1 : -1);
    return sortedSales.filter(sale => sale.nft.nftType === filter);
  }, [sales, filter]);

  const salesToRender = sliceData(activePage, itemsPerPage, filteredSales);

  return (
    <div className={classes.root}>
      <BorderCardWrapper className={classes.card}>
        <div className={classes.cardContent}>
          <Typography variant='h3' align='center' className={classes.title}>
            MabsVerse Assets
          </Typography>
          <div className={classes.assets}>
            <Grid container spacing={isSm ? 2 : 3}>
              <Grid item md={6} sm={6} xs={12}>
                <ContainedButton
                  onClick={handleChangeAssetType('avatar')}
                  className={clsx(classes.button, {
                    [classes.activeAssetType]: assetType === 'avatar',
                  })}>
                  Avatar Assets
                  <div className={classes.icon}>
                    <AssetOptionIcon />
                  </div>
                </ContainedButton>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <ContainedButton
                  disabled
                  onClick={handleChangeAssetType('game')}
                  className={clsx(classes.button, {
                    [classes.activeAssetType]: assetType === 'game',
                  })}
                  classes={{
                    disabled: classes.buttonDisabled,
                  }}>
                  Game Mode Assets
                  <div className={classes.icon}>
                    <AssetOptionIcon />
                  </div>
                </ContainedButton>
              </Grid>
            </Grid>
            <Grid container justifyContent='space-between' alignItems='center'>
              <div>
                <Typography className={classes.filterLabel}>Filter by category</Typography>
                <Grid container className={classes.filters}>
                  {ASSET_TYPES.map(assetType => {
                    return (
                      <div
                        key={assetType.value}
                        onClick={handleChangeFilter(assetType.value)}
                        className={clsx(classes.filterItem, {
                          [classes.activeFilter]: filter === assetType.value,
                        })}>
                        {assetType.label}
                      </div>
                    );
                  })}
                </Grid>
              </div>
              {filteredSales.length >= itemsPerPage && 
                <AssetsPagination 
                  dataCount={filteredSales.length} 
                  activePage={activePage} 
                  itemsPerPage={itemsPerPage}
                  onChangePage={onSetActivePage}
                  onSetItemsPerPage={onSetItemsPerPage}
                />
              }
            </Grid>
            <Divider className={classes.divider} />
            {salesToRender.length ? (
              <Grid container spacing={5}>
                {salesToRender.map((sale, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4}>
                    <AssetItem asset={sale} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <EmptyAssetState assetType={filter} />
            )}
          </div>
        </div>
      </BorderCardWrapper>
    </div>
  );
};

export default memo(FiefverseShop);
