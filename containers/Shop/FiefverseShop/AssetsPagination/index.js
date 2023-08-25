import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { usePagination } from '@material-ui/lab/Pagination';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  pagination: {
    gap: 32,
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down('xs')]: {
      gap: 16,
      width: '100%',
      justifyContent: 'center'
    }
  },
  dot: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    borderRadius: theme.spacing(4),
    background: 'rgba(137, 175, 245, 0.5)',
    cursor: 'pointer',

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      borderRadius: theme.spacing(3),
    }
  },
  activeDot: {
    background: '#89AFF5',
  },
  dotWrapper: {
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
    borderRadius: theme.spacing(5.5),
    border: '2px solid #fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(4.5),
      height: theme.spacing(4.5),
      borderRadius: theme.spacing(4.5),
    }
  },
  selected: {
    border: '2px solid #474D66',
  }
}));

export const useAssetsPagination = () => {
  const [activePage, setActivePage] = useState(1);

  return {
    activePage,
    onSetActivePage: setActivePage,
  };
};

export const sliceData = (currentPage, itemsPerPage, data) => {
  if (!data) {
    return [];
  }
  const offset = (currentPage - 1) * itemsPerPage;
  let cdata = [];
  if (data.length && data.length > itemsPerPage) {
    cdata = data.slice(offset, offset + itemsPerPage);
  } else {
    cdata = data;
  }
  return cdata;
};

const AssetsPagination = ({ className, dataCount, activePage, itemsPerPage, onChangePage }) => {
  const classes = useStyles();

  const handleChangePageNumber = pageNumber => () => {
    onChangePage(pageNumber);
  };

  const { items } = usePagination({
    count: Math.ceil(dataCount / itemsPerPage),
    hidePrevButton: true,
    hideNextButton: true,
    page: activePage,
    onChange: handleChangePageNumber,
  });

  return (
    <div className={clsx(classes.pagination, className)}>
      {items.map(item => {
        return item.selected ? (
          <div
            onClick={handleChangePageNumber(item.page)}
            key={item.page}
            className={clsx(classes.dotWrapper, classes.selected)}>
            <div className={clsx(classes.dot, classes.activeDot)} />
          </div>
        ) : (
          <div key={item.page} className={classes.dotWrapper} onClick={handleChangePageNumber(item.page)}>
            <div className={classes.dot} />
          </div>
        );
      })}
    </div>
  );
};

export default AssetsPagination;
