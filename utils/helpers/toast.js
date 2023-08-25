import { toast } from 'react-toastify';

const showSuccessToast = ({ message, link = '', buttonLabel = 'View your NFT' }) => {
  toast.success(
    <>
      <div className='header-container'>Success!</div>
      <div className='content'>
        {message} {link ? <a href={link}>{buttonLabel}</a> : null}
      </div>
    </>,
    {
      position: toast.POSITION.TOP_RIGHT,
    },
  );
};

export { showSuccessToast };
