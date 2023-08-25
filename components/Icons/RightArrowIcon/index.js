import { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const RightArrowIcon = ({ className, viewBox, color, ...rest }) => {
  return (
    <SvgIcon viewBox={viewBox || '0 0 20 14'} {...rest} fill='none' className={className}>
      <path
        d='M12.3 13.3C12.1167 13.1167 12.025 12.8834 12.025 12.6C12.025 12.3167 12.1167 12.0834 12.3 11.9L16.2 8.00005H1C0.716667 8.00005 0.479333 7.90405 0.288 7.71205C0.0960001 7.52072 0 7.28338 0 7.00005C0 6.71672 0.0960001 6.47905 0.288 6.28705C0.479333 6.09572 0.716667 6.00005 1 6.00005H16.2L12.3 2.10005C12.1167 1.91672 12.025 1.68338 12.025 1.40005C12.025 1.11672 12.1167 0.883382 12.3 0.700048C12.4833 0.516715 12.7167 0.425049 13 0.425049C13.2833 0.425049 13.5167 0.516715 13.7 0.700048L19.3 6.30005C19.4 6.40005 19.471 6.50838 19.513 6.62505C19.5543 6.74172 19.575 6.86672 19.575 7.00005C19.575 7.13338 19.5543 7.25838 19.513 7.37505C19.471 7.49172 19.4 7.60005 19.3 7.70005L13.7 13.3C13.5167 13.4834 13.2833 13.575 13 13.575C12.7167 13.575 12.4833 13.4834 12.3 13.3Z'
        fill={color || 'white'}
      />
    </SvgIcon>
  );
};

export default memo(RightArrowIcon);