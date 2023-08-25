import { memo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cell: {
    textTransform: 'uppercase',
    background: 'linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
    borderColor: '#eff1f7',
    borderWidth: 1,
    fontSize: 18,
    fontWeight: 700,
  },
}));

const TableContainer = ({ isEmpty = false, columns, className, children }) => {
  const classes = useStyles();

  return (
    <Table aria-label='table' className={className}>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth, width: column.width, maxWidth: column.maxWidth }}
              className={classes.cell}>
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {isEmpty ? (
          <TableRow>
            <TableCell colSpan={columns.length} align='center'>
              <Typography variant='h5' color='primary'>
                No Data
              </Typography>
            </TableCell>
          </TableRow>
        ) : (
          children
        )}
      </TableBody>
    </Table>
  );
};

export default memo(TableContainer);
