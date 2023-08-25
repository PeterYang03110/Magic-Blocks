import { makeStyles } from '@material-ui/core/styles';

const useAuthStyles = makeStyles(theme => ({
  dialog: {
    maxWidth: 500,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    width: '100%',
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    fontWeight: 500,
    color: '#1F182A',
    cursor: 'pointer',
    textDecorationLine: 'underline',
    lineHeight: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'pedestria-mvb',
    color: '#000000',
    lineHeight: 1,
  },
  successTitle: {
    color: '#00D68F',
  },
  description: {
    fontSize: 18,
    color: '#474D66',
  },
  subDescription: {
    fontSize: 14,
    color: '#474D66',
  },
  check: {
    color: '#1F182A',
    margin: 0,
    '& a': {
      color: '#4D6EFF',
      textDecoration: 'unset',
    },
  },
  subButton: {
    display: 'flex',
    alignItems: 'center',
    color: '#4D6EFF',
    height: '100%',
    fontSize: 16,
    fontWeight: 600,
    border: 'unset',
    background: 'unset',
    padding: 0,
    cursor: 'pointer',
    textDecorationLine: 'underline',
  },
  footerDescription: {
    color: '#8F95B2',
    '& span': {
      cursor: 'pointer',
      color: '#4D6EFF',
    },
  },
  alertContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    gap: 24,
    background: '#F0FFF5',
    border: '1px solid #00D68F',
    borderRadius: 6,
  },
  alert: {
    fontSize: 14,
    color: '#00997A',
  },
  validateContainer: {
    color: '#00D68F',
  },
  validate_ch_container: {
    marginLeft: '1rem'
  },
  validate_failed: {
    color: '#FF3D71',
  },
  validateConfirmContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: theme.spacing(2),
    gap: 24,
    background: '#FFF2F2',
    border: '1px solid #FF3D71',
    color: '#FF3D71',
    borderRadius: 6,
  },
  errorSubDescription: {
    fontSize: 14,
    color: '#FF3D71',
  },
}));

export default useAuthStyles;
