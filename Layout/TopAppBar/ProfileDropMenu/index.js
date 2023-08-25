import { memo, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Divider, Menu, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from 'contexts/auth-context';
import { useAsset } from 'contexts/asset-context';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import LinkButton from 'components/UI/Buttons/LinkButton';
import AvatarPlaceholderIcon from 'components/Icons/AvatarPlaceholderIcon';
import AlertCard from './AlertCard';
import { PROFILE_AVATAR_ICON_PATH } from 'utils/constants/image-paths';
import PROFILE_MENU from 'utils/constants/profile-menu';
import AUTH_TYPES from 'utils/constants/auth-types';
import getEllipsis from 'utils/helpers/getEllipsis';
import LINKS from 'utils/constants/links';

const useStyles = makeStyles(theme => ({
  avatarWrapper: {
    height: 40,
    background: '#2c2c2c',
    cursor: 'pointer',
  },
  avatar: {
    width: 40,
    height: 40,
    objectFit: 'cover',
  },
  paper: {
    maxWidth: 375,
    width: '100%',
    marginTop: theme.spacing(2),
    padding: 0,
    borderRadius: 6,
    [theme.breakpoints.down('sm')]: {
      maxWidth: `calc(100% - 48px)`,
    },
  },
  menu: {
    padding: 0,
  },
  container: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    background: '#ffffff',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    gap: 12,
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
    color: '#474D66',
    '& span': {
      fontSize: 20,
      fontFamily: 'pedestria-mvb,sans-serif',
      fontWeight: 700,
      color: '#0b0b0b',
    },
  },
  linkContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  item: {
    display: 'flex',
    borderRadius: 6,
    color: '#474D66',
    padding: 6,
    gap: 8,
  },
  divider: {
    height: 1,
    width: '100%',
    background: '#D8DAE5',
  },
  logOut: {
    textAlign: 'center',
    color: '#8F95B2',
  },
}));

const ProfileDropMenu = () => {
  const classes = useStyles();
  const router = useRouter();
  const { userAvatars } = useAsset();

  const {
    accessToken,
    isWrongWallet,
    userProfile: { userName = 'No UserName', email = '', wallet = '', validated = false, selectedAvatar = null } = {},
    logout,
    setAuthModal,
  } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const alert = useMemo(() => {
    if (!accessToken) {
      return (
        <>
          {`Looks like you don’t have an account linked to this Wallet. `}
          <span
            onClick={() => {
              setAuthModal(AUTH_TYPES.SIGN_IN);
              setAnchorEl(null);
            }}>
            Sign in
          </span>
          {' or '}
          <span
            onClick={() => {
              setAuthModal(AUTH_TYPES.SIGN_UP);
              setAnchorEl(null);
            }}>
            Create an account
          </span>
        </>
      );
    } else if(accessToken && !email) {
      return (
        <>
        {`Looks like you don’t have an account linked to this Wallet. `}
        <span
          onClick={() => {
            setAuthModal(AUTH_TYPES.SIGN_UP);
            setAnchorEl(null);
          }}>
          Create an account
        </span>
      </>
      )
    } else if(accessToken && !validated) {
      return <>
        {`Email not verified `}
        <span
          onClick={() => {
            router.push(LINKS.PROFILE.HREF);
            setAnchorEl(null);
          }}>
          Go to Settings
        </span>
      </>
    }

    return '';
  }, [accessToken, setAuthModal, setAnchorEl, email, router, validated]);

  const handleClick = useCallback(
    event => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const logoutHandler = useCallback(() => {
    logout();
    setAnchorEl(null);
  }, [setAnchorEl, logout]);

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

  const getAvatarImage = (selectedAvatar) => {
    var img_url = PROFILE_AVATAR_ICON_PATH;
    if(selectedAvatar && selectedAvatar.split('#').length === 3) {
      const contractAddress = selectedAvatar.split('#')[0];
      const chainId = parseInt(selectedAvatar.split('#')[1]);
      const tokenId = parseInt(selectedAvatar.split('#')[2]);
      userAvatars.forEach(element => {
        if(element.contractAddress == contractAddress && element.chainId == chainId && element.tokenId == tokenId)
        img_url = element.image;
      });
    }

    return img_url;
  }


  return (
    <>
      {accessToken && !isWrongWallet ? (
        <BorderCardWrapper rootClassName={classes.avatarWrapper}>
          <img
            alt='profile'
            src={getAvatarImage(selectedAvatar)}
            className={classes.avatar}
            onClick={handleClick}
          />
        </BorderCardWrapper>
      ) : (
        <AvatarPlaceholderIcon onClick={handleClick} />
      )}

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
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{
          paper: classes.paper,
          list: classes.menu,
        }}>
        <div>
          <BorderCardWrapper rootClassName={classes.container}>
            <AlertCard alert={alert} />

            <div className={classes.profileContainer}>
              {accessToken && email ? <BorderCardWrapper rootClassName={classes.avatarWrapper}>
                  <img alt='profile' src={getAvatarImage(selectedAvatar)} className={classes.avatar} />
                </BorderCardWrapper>
              :<></>}
              
              {accessToken && email ? (
                <Typography className={classes.profileInfo}>
                  <span>Welcome {!!email ? userName : getEllipsis(wallet)}</span>
                  {!!email ? email : getEllipsis(wallet)}
                </Typography>
              ) : (
                <Typography className={classes.profileInfo}>
                  <span>Welcome</span>
                </Typography>
              )}
            </div>

            <Divider className={classes.divider} />

            <div className={classes.linkContainer}>
              {PROFILE_MENU.map(item => (
                <MenuItem
                  key={item.TITLE}
                  className={classes.item}
                  disabled={email.length > 0 && item.TITLE == 'Setting' ? false : item.DISABLED}
                  onClick={itemHandler(item)}>
                  {item.ICON}
                  {item.TITLE}
                </MenuItem>
              ))}
            </div>

            {accessToken && (
              <>
                <Divider className={classes.divider} />

                <LinkButton onClick={logoutHandler} className={classes.logOut}>
                  Log Out
                </LinkButton>
              </>
            )}
          </BorderCardWrapper>
        </div>
      </Menu>
    </>
  );
};

export default memo(ProfileDropMenu);
