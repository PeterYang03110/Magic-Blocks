import { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from 'contexts/auth-context';
import HomeHero from './HomeHero';
import PurchaseFief from './PurchaseFief';
import HomeFAQ from './HomeFAQ';
import ResetPassword from 'containers/Auth/ResetPassword';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    scrollBehavior: 'smooth !important',
  },
}));

const Home = () => {
  const classes = useStyles();
  const router = useRouter();
  const { verifyAccount, setAuthModal } = useAuth();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const { verifyToken = '', type = '' } = router.query;
    if (!verifyToken) {
      return;
    }
    if (type === 'reset') {
      setOpen(true);
      return;
    }

    verifyAccount(verifyToken);
  }, [router.query, verifyAccount, setAuthModal, setOpen]);

  return (
    <main className={classes.root}>
      <HomeHero />
      <PurchaseFief />
      <HomeFAQ />
      <ResetPassword open={open} setOpen={setOpen} setAuthModal={setAuthModal}></ResetPassword>
    </main>
  );
};

export default memo(Home);
