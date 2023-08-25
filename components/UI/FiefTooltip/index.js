import React, { memo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.text.grey,
    color: theme.palette.primary.contrastText,
    maxWidth: 280,
    fontSize: '0.875rem',
  },
  arrow: {
    color: theme.palette.text.grey,
  },
}))(Tooltip);

const FiefTooltip = React.forwardRef(({ children, tooltip, ...rest }, ref) => {
  return (
    <HtmlTooltip title={tooltip} arrow ref={ref} {...rest}>
      {children}
    </HtmlTooltip>
  );
});

export default memo(FiefTooltip);
