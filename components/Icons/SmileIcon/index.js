import { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const SmileIcon = ({ className, viewBox, color, ...rest }) => {
  return (
    <SvgIcon viewBox={viewBox || '0 0 20 20'} {...rest} fill='none' className={className}>
      <path
        d='M13.5 9C13.9333 9 14.2917 8.85833 14.575 8.575C14.8583 8.29167 15 7.93333 15 7.5C15 7.06667 14.8583 6.70833 14.575 6.425C14.2917 6.14167 13.9333 6 13.5 6C13.0667 6 12.7083 6.14167 12.425 6.425C12.1417 6.70833 12 7.06667 12 7.5C12 7.93333 12.1417 8.29167 12.425 8.575C12.7083 8.85833 13.0667 9 13.5 9ZM6.5 9C6.93333 9 7.29167 8.85833 7.575 8.575C7.85833 8.29167 8 7.93333 8 7.5C8 7.06667 7.85833 6.70833 7.575 6.425C7.29167 6.14167 6.93333 6 6.5 6C6.06667 6 5.70833 6.14167 5.425 6.425C5.14167 6.70833 5 7.06667 5 7.5C5 7.93333 5.14167 8.29167 5.425 8.575C5.70833 8.85833 6.06667 9 6.5 9ZM10 15.5C11.0333 15.5 11.9583 15.25 12.775 14.75C13.5917 14.25 14.2417 13.5917 14.725 12.775C14.8417 12.575 14.85 12.396 14.75 12.238C14.65 12.0793 14.4833 12 14.25 12H5.75C5.51667 12 5.35 12.0793 5.25 12.238C5.15 12.396 5.15833 12.575 5.275 12.775C5.75833 13.5917 6.40833 14.25 7.225 14.75C8.04167 15.25 8.96667 15.5 10 15.5ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20ZM10 18C12.2167 18 14.1043 17.221 15.663 15.663C17.221 14.1043 18 12.2167 18 10C18 7.78333 17.221 5.89567 15.663 4.337C14.1043 2.779 12.2167 2 10 2C7.78333 2 5.896 2.779 4.338 4.337C2.77933 5.89567 2 7.78333 2 10C2 12.2167 2.77933 14.1043 4.338 15.663C5.896 17.221 7.78333 18 10 18Z'
        fill={color || 'white'}
      />
    </SvgIcon>
  );
};

export default memo(SmileIcon);
