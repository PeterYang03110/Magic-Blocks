import { makeStyles } from '@material-ui/core/styles';

const useFormStyles = makeStyles(theme => ({
  input: {
    background: '#EDEFF5',
    borderRadius: 4,
  },
  divider: {
    width: 1,
    height: 64,
    margin: theme.spacing(0, 1),
    backgroundColor: '#FFFFFF',
  },
  horizontalDivider: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(31, 31, 65, 0.1)',
  },
  receiveContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: '#EDEFF5',
    borderRadius: 6,
  },
  sFiefBalance: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#474D66',
    '& span': {
      fontWeight: 600,
      color: '#070B1D',
    },
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },
  dateButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(0.5),
  },
  dateButton: {
    fontSize: 16,
    textTransform: 'unset',
    minWidth: 'unset',
    fontFamily: 'Inter',
    borderColor: '#FFFFFF',
    width: 'fit-content',
    padding: theme.spacing(0.5, 1),
    letterSpacing: -1.2,
    '& span': {
      whiteSpace: 'nowrap',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
      padding: theme.spacing(0.5),
    },
  },
  unselectedButton: {
    color: '#474D66',
    background: '#FFFFFF',
  },
  alert: {
    fontSize: 12,
    color: '#797FF2',
  },
  disabledText: {
    opacity: 0.4,
  },
}));

export default useFormStyles;
