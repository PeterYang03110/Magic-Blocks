import { memo, useCallback, useState } from 'react';
import { Typography, FormControlLabel, Grid, Divider } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';

import { usePopup } from 'contexts/popup-context';
import { useChat } from 'contexts/chat-context';
import GradientButton from 'components/UI/Buttons/GradientButton';
import FiefTextField from 'components/UI/TextFields/FiefTextField';
import FiefCheckbox from 'components/UI/FiefCheckbox';
import FiefTokenIcon from 'components/FiefTokenIcon';
import { EMAIL_VALID, ADDRESS_VALID } from 'utils/constants/validations';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import SquareAvatarIcon from 'components/Icons/SquareAvatarIcon';
import GreenCheckIcon from 'components/Icons/GreenCheckIcon';
import LinkButton from 'components/UI/Buttons/LinkButton';
import LINKS from 'utils/constants/links';
import SquareAlertIcon from 'components/Icons/SquareAlertIcon';
import SquareAccountIcon from 'components/Icons/SquareAccountIcon';

const useStyles = makeStyles(theme => ({
  check: {
    margin: 0,
  },
  button: {
    fontSize: 20,
  },
  helpContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: theme.spacing(3),
    background: 'rgba(11, 11, 11, 0.2)',
    border: '2px solid #474D66',
    borderRadius: 6,
  },
  helpTitle: {
    fontSize: 32,
    fontFamily: 'pedestria-mvb',
    color: '#9FA4FF',
  },
  divider: {
    height: 1,
    width: '100%',
    background: '#474D66;',
  },
  helpDescription: {
    fontSize: 18,
    lineHeight: '30px',
    color: '#F0F1FE',
    '& span': {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 'bold',
      color: '#00D68F',
    },
  },
  statusCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: theme.spacing(1),
    backgroundColor: '#1c1525',
  },
  statusHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    fontWeight: 600,
    textTransform: 'uppercase',
    color: '#F0F1FE',
  },
  statusAction: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
  },
  comingSoon: {
    fontWeight: 600,
    color: '#9FA4FF',
  },
}));

const schema = yup.object().shape({
  email: EMAIL_VALID,
  address: ADDRESS_VALID,
});

const ChatSignUpForm = () => {
  const classes = useStyles();
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const { onChatSignUp } = useChat();
  const { setPopUp } = usePopup();

  const [agree, setAgree] = useState(false);

  const onSubmit = useCallback(
    async data => {
      if (!agree) {
        setPopUp({
          isError: true,
          title: 'Error',
          text: `Please Check to agree to our Terms of Service and Privacy Policy`,
        });
        return;
      }
      console.log(data);
      await onChatSignUp(data);
    },
    [agree, onChatSignUp, setPopUp],
  );

  const agreeHandler = useCallback(
    event => {
      setAgree(event.target.checked);
    },
    [setAgree],
  );

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Controller
            as={<FiefTextField />}
            darkMode
            label='EMAIL'
            name='email'
            placeholder='Email'
            error={errors.email?.message}
            control={control}
            defaultValue={''}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                as={<FiefTextField />}
                darkMode
                label='ETHEREUM ADDRESS'
                name='address'
                placeholder='Copy & Paste Wallet Address'
                error={errors.address?.message}
                control={control}
                defaultValue={''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <GradientButton fullWidth className={classes.button}></GradientButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            value='end'
            control={<FiefCheckbox checked={agree} onChange={agreeHandler} />}
            label='Check to agree to our Terms of Service and Privacy Policy'
            className={classes.check}
          />
        </Grid>
        <Grid item xs={12}>
          <GradientButton fullWidth type='submit' className={classes.button}>
            Submit
          </GradientButton>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.helpContainer}>
            <Typography className={classes.helpTitle}>
              Wait, why do you need an Ethereum Address?
            </Typography>
            <Divider className={classes.divider} />
            <Typography className={classes.helpDescription}>
              Funny you should ask – If you complete the bottom three tasks before Magic Blocks Chat goes
              live, we will reward your account with{' '}
              <span>
                Free Influence Points <FiefTokenIcon token='IP' size={24} />
              </span>
            </Typography>
            <BorderCardWrapper rootClassName={classes.statusCard}>
              <Typography className={classes.statusHeader}>
                <SquareAvatarIcon />
                Own a Magic Blocks Avatar
              </Typography>
              <div className={classes.statusAction}>
                <LinkButton href={LINKS.SHOP.HREF}>Visit Shop</LinkButton>
                <GreenCheckIcon />
              </div>
            </BorderCardWrapper>

            <BorderCardWrapper rootClassName={classes.statusCard}>
              <Typography className={classes.statusHeader}>
                <SquareAlertIcon />
                sign up for email alerts
              </Typography>
              <GreenCheckIcon />
            </BorderCardWrapper>

            <BorderCardWrapper rootClassName={classes.statusCard}>
              <Typography className={classes.statusHeader}>
                <SquareAccountIcon />
                create an account
              </Typography>
              <div className={classes.statusAction}>
                <Typography className={classes.comingSoon}>COMING SOON</Typography>
                <GreenCheckIcon />
              </div>
            </BorderCardWrapper>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(ChatSignUpForm);
