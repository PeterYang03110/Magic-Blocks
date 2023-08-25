import { memo, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import {
  MenuItem,
  Hidden,
  IconButton,
  Grid,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { use100vh } from 'react-div-100vh';

import Logo from 'components/Logo';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import TOP_BAR_MENU from 'utils/constants/top-bar-menu';
import ConnectWalletMobile from '../ConnectWalletMobile';
import AccountCard from '../AccountCard';

const useStyles = makeStyles(theme => ({
  paper: {
    minWidth: 120,
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.primary,
    padding: theme.spacing(0),
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  menu: {
    width: 25,
    height: 25,
    color: theme.palette.text.primary,
  },
  item: {
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    fontSize: theme.spacing(2.5),
    borderRadius: 4,
    color: theme.palette.text.primary,
    padding: theme.spacing(1.5),
    color: '#fff',

    '&.Mui-disabled': {
      color: '#33343d',
      opacity: 1,
    },
  },
  menuPanel: ({ deviceHeight }) => ({
    position: 'fixed',
    padding: theme.spacing(4, 2.5, 7),
    top: 0,
    left: 0,
    backgroundColor: theme.palette.background.primary,
    width: '100%',
    transition: 'padding-top 0.2s, width 0.2s',
    zIndex: 11,
    transform: 'translate3d(0, 0, 0)',
    height: deviceHeight,
    width: '100%',
    overflow: 'auto',
  }),
  backIcon: {
    fontSize: theme.spacing(3),
    margin: theme.spacing(1.5),
    cursor: 'pointer',
  },
  titleContainer: {
    padding: theme.spacing(3, 0),
  },
  title: {
    fontSize: theme.spacing(2.5),
    fontWeight: 700,
    lineHeight: 1.2,
    fontFamily: 'pedestria-mvb',
    textTransform: 'uppercase',
    marginLeft: theme.spacing(2),
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: theme.spacing(3),
    background: `linear-gradient(130.42deg, #797FF2 0%, #DAF9FC 80%, #edbbfd 100%)`,
  },
  connectButton: {
    width: '100%',
    height: theme.spacing(7),
    fontFamily: 'Inter',
    fontWeight: 600,
  },
  menuContent: {
    width: '100%',
  },
  accordion: {
    background: 'transparent',
    boxShadow: 'none',
  },
  accordionCard: {
    background: '#0b0b0b',
    '&:hover': {
      background: 'linear-gradient(to right, #797FF2 0%, #DAF9FC 50.95%, #FF7DFD 100%)',
    },
  },
  accordionButton: {
    background: '#0b0b0b',
  },
  accordionExpanded: {
    margin: '0 !important',
  },
  accordionSummary: {
    paddingLeft: 0,
    paddingRight: theme.spacing(1.5),
  },
  accordionSummaryContent: {
    margin: '0 !important',
  },
  accordionSummaryExpanded: {
    minHeight: 'unset !important',
    background: 'rgba(71, 77, 102, 0.2) !important',
    height: theme.spacing(6.75),
    borderRadius: 0,
  },
  expandIcon: {
    color: 'white',
  },
  accordionDetails: {
    background: 'white',
    boxShadow: '0px 12px 40px rgba(7, 11, 29, 0.16)',
    borderRadius: theme.spacing(0.75),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
  },
  accordionDetailsWrapper: {
    marginTop: theme.spacing(1),
  },
  subMenuItem: {
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    fontSize: theme.spacing(2.5),
    borderRadius: 4,
    color: theme.palette.text.primary,
    padding: theme.spacing(1),
    color: '#1F182A',
    marginBottom: theme.spacing(1),
    minHeight: 'unset',
    lineHeight: 1.2,

    '&:last-child': {
      marginBottom: 0,
    },
    '&.Mui-disabled': {
      color: '#D8DAE5',
      opacity: 1,
    },
  },
  menus: {
    marginBottom: theme.spacing(2),
  },
  groupTitle: {
    fontSize: 14,
    color: theme.custom.palette.whitePurple,
    paddingLeft: 8,
  },
}));

const NavDropMenu = () => {
  const deviceHeight = use100vh();
  const { account } = useWeb3React();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 950 ? 950 : deviceHeight}px` : '100vh',
  });
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
    [router],
  );

  return (
    <>
      <Hidden mdUp>
        <IconButton aria-label='settings' onClick={handleClick} edge='start'>
          <MenuIcon className={classes.menu} />
        </IconButton>
        {anchorEl && (
          <Grid
            container
            direction='column'
            justifyContent='space-between'
            wrap='nowrap'
            className={classes.menuPanel}>
            <div className={classes.menuContent}>
              <ArrowBackIosIcon onClick={handleClose} className={classes.backIcon} />
              <Grid className={classes.titleContainer} container alignItems='center'>
                <Logo size={48} />
                <Typography color='textPrimary' className={classes.title}>
                  Official platform
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              {account && <AccountCard />}
              <div className={classes.menus}>
                {TOP_BAR_MENU.map((item, index) => {
                  if (item.CHILDREN) {
                    return (
                      <Accordion
                        key={index}
                        className={classes.accordion}
                        classes={{ expanded: classes.accordionExpanded }}>
                        <BorderCardWrapper
                          className={classes.accordionCard}
                          rootClassName={classes.accordionButton}>
                          <AccordionSummary
                            classes={{
                              expanded: classes.accordionSummaryExpanded,
                              content: classes.accordionSummaryContent,
                            }}
                            className={classes.accordionSummary}
                            expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
                            aria-controls='panel1a-content'
                            id='panel1a-header'>
                            <MenuItem className={classes.item} disabled={item.DISABLED}>
                              {item.TITLE}
                            </MenuItem>
                          </AccordionSummary>
                        </BorderCardWrapper>
                        <BorderCardWrapper className={classes.accordionDetailsWrapper}>
                          <AccordionDetails className={classes.accordionDetails}>
                            {item.CHILDREN.map((subMenuItem, index) => (
                              <div key={index}>
                                {subMenuItem.GROUPTITLE && (
                                  <Typography className={classes.groupTitle}>
                                    {subMenuItem.GROUPTITLE}
                                  </Typography>
                                )}
                                {subMenuItem.LINKS.map(link => (
                                  <MenuItem
                                    key={link.TITLE}
                                    className={classes.subMenuItem}
                                    onClick={itemHandler(link)}
                                    disabled={link.DISABLED}>
                                    {link.TITLE}
                                  </MenuItem>
                                ))}
                              </div>
                            ))}
                          </AccordionDetails>
                        </BorderCardWrapper>
                      </Accordion>
                    );
                  } else {
                    return (
                      <MenuItem
                        key={index}
                        className={classes.item}
                        onClick={itemHandler(item)}
                        disabled={item.DISABLED}>
                        {item.TITLE}
                      </MenuItem>
                    );
                  }
                })}
              </div>
            </div>
            <ConnectWalletMobile className={classes.connectButton} />
          </Grid>
        )}
      </Hidden>
    </>
  );
};

export default memo(NavDropMenu);
