import React, { memo, useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

import DownGreyIcon from 'components/Icons/DownGreyIcon';

const useStyles = makeStyles(theme => ({
  label: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: theme.custom.palette.lightGrey,
  },
  root: {
    cursor: 'pointer',
    position: 'relative',
    '&:hover $menuList': {
      display: 'block',
    },
    '&:hover svg': {
      transform: 'rotate(180deg)',
    },
  },
  activeMenu: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#0B0B0B',
    padding: theme.spacing(2),
    textDecoration: 'none',
    border: `2px solid #E1C18F`,
  },
  activeLabel: {
    fontSize: 24,
    fontFamily: 'pedestria-mvb',
    lineHeight: 1,
    color: '#E1C18F',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflowWrap: 'break-word',
    WebkitLineClamp: 1,
  },
  menuList: {
    marginTop: 0,
    position: 'absolute',
    display: 'none',
    top: '100%',
    left: 0,
    zIndex: 100,
    background: '#0B0B0B',
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  menuItem: {
    display: 'flex',
    padding: theme.spacing(1, 3),
    fontWeight: 700,
    color: theme.palette.primary.main,
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#232a5d',
    },
  },
  activeDot: {
    background: theme.palette.primary.main,
    width: theme.spacing(2),
    height: theme.spacing(2),
    borderRadius: '50%',
  },
  disabled: {
    color: '#474D66',
    borderColor: '#474D66',
    '&:hover svg': {
      transform: 'unset',
    },
  },
}));

const DropDown = ({ items, onSelect, selectedItem }) => {
  const classes = useStyles();

  const selectHandler = useCallback(
    item => {
      onSelect && onSelect(item);
    },
    [onSelect],
  );

  return (
    <div className={clsx(classes.menuList)}>
      {items.map((item, index) => (
        <div className={classes.menuItem} key={index} onClick={() => selectHandler(item)}>
          <Typography>{item.label}</Typography>
          {selectedItem?.value === item.value && <div className={classes.activeDot} />}
        </div>
      ))}
    </div>
  );
};

const FiefSelect = React.forwardRef(
  ({ items, onChange, value, label, placeholder, className, ...rest }, ref) => {
    const classes = useStyles();

    const selectHandler = useCallback(
      item => {
        onChange(item.value);
      },
      [onChange],
    );

    const selectedItem = items.find(item => item.value === value);

    const isDisabled = items.length === 0;

    return (
      <div>
        {!!label && <Typography className={classes.label}>{label}</Typography>}

        <Box ref={ref} className={clsx(classes.root, className)} {...rest}>
          <Box className={clsx(classes.activeMenu, { [classes.disabled]: isDisabled })}>
            <Typography className={clsx(classes.activeLabel, { [classes.disabled]: isDisabled })}>
              {selectedItem?.label || placeholder}
            </Typography>
            <DownGreyIcon color={isDisabled ? 'disabled' : 'default'} />
          </Box>

          <DropDown items={items} onSelect={selectHandler} selectedItem={selectedItem} />
        </Box>
      </div>
    );
  },
);

export default memo(FiefSelect);
