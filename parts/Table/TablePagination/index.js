import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination, PaginationItem } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  root: {},
  outlinedSecondary: {
    fontSize: 14,
    color: '#8F95B2 !important',
  },
  primary: {
    color: '#FFFFFF !important',
    background: '#797FF2',
  },
}));

const TablePagination = ({ page, setPage, total, rowsPerPage, color = 'primary' }) => {
  const classes = useStyles();

  return (
    <Pagination
      shape='rounded'
      color='primary'
      page={page + 1}
      count={Math.ceil(total / rowsPerPage)}
      onChange={(event, page) => setPage(page - 1)}
      classes={{
        root: classes.root,
      }}
      renderItem={({ selected, ...rest }) => (
        <PaginationItem
          {...rest}
          selected={selected}
          color={selected ? 'primary' : 'secondary'}
          classes={{
            textPrimary: classes[color],
            textSecondary: classes.outlinedSecondary,
          }}
        />
      )}
    />
  );
};

export default memo(TablePagination);
