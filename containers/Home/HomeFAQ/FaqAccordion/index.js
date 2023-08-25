import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    background: 'unset',
    borderRadius: 'unset !important',
    boxShadow: 'unset',
    '&::before': {
      display: 'none',
    },
  },
  expanded: {},
  title: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '26px',
    textTransform: 'uppercase',
    color: '#0b0b0b',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  description: {
    fontSize: 18,
    fontWeight: 500,
    color: '#474D66',
    lineHeight: '26px',
    '& a': {
      color: '#4c6eff',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  expandIcon: {
    color: '#0b0b0b',
  },
}));

const FaqAccordion = ({ className, faq, selected, onSelect }) => {
  const classes = useStyles();

  return (
    <Accordion
      expanded={selected}
      onClick={() => onSelect()}
      classes={{
        root: clsx(classes.root, className),
        expanded: classes.expanded,
      }}>
      <AccordionSummary
        expandIcon={
          selected ? (
            <RemoveIcon className={classes.expandIcon} />
          ) : (
            <AddIcon className={classes.expandIcon} />
          )
        }
        aria-controls='panel1c-content'
        id='panel1c-header'>
        <Typography className={classes.title}>{faq.title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.detailContainer}>
        <div className={classes.description}>{faq.description}</div>
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(FaqAccordion);
