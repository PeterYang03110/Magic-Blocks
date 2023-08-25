import { memo, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Menu, MenuItem, Button, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import clsx from 'clsx';

import BorderCardWrapper from 'parts/BorderCardWrapper';

const useStyles = makeStyles(theme => ({
  paper: {
    minWidth: 200,
    marginTop: theme.spacing(2),
    padding: theme.spacing(0),
    borderRadius: 6,
  },
  menu: {
    padding: 0,
  },
  container: {
    padding: theme.spacing(1),
  },
  item: {
    fontSize: 20,
    fontFamily: 'pedestria-mvb,sans-serif',
    fontWeight: 700,
    borderRadius: 6,
    color: '#1F182A',

    '&.Mui-disabled': {
      color: '#D8DAE5',
      opacity: 1,
    },
  },
  selected: {
    background: '#EDEFF5',
  },
  disabled: {
    color: '#D8DAE5',
  },
  buttonItem: {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: 'pedestria-mvb,sans-serif',
    textTransform: 'unset',
    padding: theme.spacing(0, 2),
    color: '#fff',
    borderRadius: 6,
    '&:hover': {
      color: '#FFFFFF',
      background: 'rgba(71, 77, 102, 0.2)',
    },
  },
  buttonSelected: ({ isMoz }) => ({
    color: '#fff',
    position: 'relative',
    background: 'rgba(71, 77, 102, 0.2)',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '6px',
      border: '1px solid transparent',
      background: 'linear-gradient(90deg, #797FF2 0%, #DAF9FC 50%, #FF7DFD 100%) border-box',
      WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
      maskComposite: isMoz ? 'exclude' : 'clear',
      WebkitMaskComposite: isMoz ? 'exclude' : 'clear',
    },
  }),
  buttonDisabled: {
    color: 'rgba(143, 149, 178, 0.3) !important',
  },
  groupTitle: {
    fontSize: 14,
    color: theme.custom.palette.whitePurple,
    paddingLeft: 16,
  },
  divider: {
    margin: '8px 0',
  },
}));

const GroupBarItem = ({ link: linkGroup }) => {
  const classes = useStyles({ isMoz: typeof InstallTrigger !== 'undefined' });
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback(
    event => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const itemHandler = useCallback(
    item => () => {
      if (item.IS_EXTERNAL_LINK) {
        window.open(item.HREF, '_blank');
        setAnchorEl(null);
        return;
      }
      router.push(item.HREF);
      setAnchorEl(null);
    },
    [router, setAnchorEl],
  );

  const isSelected = useMemo(() => {
    for (const links of linkGroup.CHILDREN) {
      for (const link of links.LINKS) {
        if (link.HREF === router.pathname) {
          return true;
        }
      }
    }
    return false;
  }, [linkGroup, router.pathname]);

  return (
    <>
      <Button
        className={clsx(classes.buttonItem, {
          [classes.buttonSelected]: isSelected,
        })}
        classes={{
          disabled: classes.buttonDisabled,
        }}
        onClick={handleClick}
        endIcon={anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
        {linkGroup.TITLE}
      </Button>
      <Menu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        classes={{
          paper: classes.paper,
          list: classes.menu,
        }}>
        <div>
          <BorderCardWrapper rootClassName={classes.container}>
            {linkGroup.CHILDREN.map((item, index) => (
              <div key={index}>
                {item.GROUPTITLE && (
                  <Typography className={classes.groupTitle}>{item.GROUPTITLE}</Typography>
                )}
                {item.LINKS.map(item => {
                  return (
                    <div key={item.TITLE}>
                      <MenuItem
                        key={item.TITLE}
                        className={clsx(classes.item, {
                          [classes.selected]: router.pathname === item.HREF,
                        })}
                        onClick={itemHandler(item)}
                        disabled={item.DISABLED}>
                        {item.TITLE}
                      </MenuItem>
                      {item.DIVIDER && <Divider className={classes.divider} />}
                    </div>
                  );
                })}
              </div>
            ))}
          </BorderCardWrapper>
        </div>
      </Menu>
    </>
  );
};

export default memo(GroupBarItem);
