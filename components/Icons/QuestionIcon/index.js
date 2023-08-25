import { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: ({ size }) => ({
    width: size,
    height: size,
    fill: 'none',
  }),
}));

const QuestionIcon = ({ className, viewBox, size = 20, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon viewBox={viewBox || '0 0 24 26'} {...rest} className={clsx(classes.root, className)}>
      <g filter='url(#filter0_d_375_9975)'>
        <mask
          id='mask0_375_9975'
          style={{ maskType: 'alpha' }}
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='24'
          height='24'>
          <rect width='24' height='24' fill='#D9D9D9' />
        </mask>
        <g mask='url(#mask0_375_9975)'>
          <path
            d='M12 17C12.2833 17 12.521 16.904 12.713 16.712C12.9043 16.5207 13 16.2833 13 16V11.975C13 11.6917 12.9043 11.4583 12.713 11.275C12.521 11.0917 12.2833 11 12 11C11.7167 11 11.4793 11.0957 11.288 11.287C11.096 11.479 11 11.7167 11 12V16.025C11 16.3083 11.096 16.5417 11.288 16.725C11.4793 16.9083 11.7167 17 12 17ZM12 9C12.2833 9 12.521 8.904 12.713 8.712C12.9043 8.52067 13 8.28333 13 8C13 7.71667 12.9043 7.479 12.713 7.287C12.521 7.09567 12.2833 7 12 7C11.7167 7 11.4793 7.09567 11.288 7.287C11.096 7.479 11 7.71667 11 8C11 8.28333 11.096 8.52067 11.288 8.712C11.4793 8.904 11.7167 9 12 9ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6873 5.825 19.975 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26267 14.6833 2 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31267 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31233 8.1 2.787C9.31667 2.26233 10.6167 2 12 2C13.3833 2 14.6833 2.26233 15.9 2.787C17.1167 3.31233 18.175 4.025 19.075 4.925C19.975 5.825 20.6873 6.88333 21.212 8.1C21.7373 9.31667 22 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6873 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6873 15.9 21.212C14.6833 21.7373 13.3833 22 12 22ZM12 20C14.2167 20 16.1043 19.221 17.663 17.663C19.221 16.1043 20 14.2167 20 12C20 9.78333 19.221 7.89567 17.663 6.337C16.1043 4.779 14.2167 4 12 4C9.78333 4 7.896 4.779 6.338 6.337C4.77933 7.89567 4 9.78333 4 12C4 14.2167 4.77933 16.1043 6.338 17.663C7.896 19.221 9.78333 20 12 20Z'
            fill='#474D66'
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_d_375_9975'
          x='0'
          y='1.5'
          width='24'
          height='24'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'>
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='1.5' />
          <feGaussianBlur stdDeviation='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.027451 0 0 0 0 0.0431373 0 0 0 0 0.113725 0 0 0 0.15 0'
          />
          <feBlend mode='multiply' in2='BackgroundImageFix' result='effect1_dropShadow_375_9975' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_375_9975'
            result='shape'
          />
        </filter>
      </defs>
    </SvgIcon>
  );
};

export default memo(QuestionIcon);
