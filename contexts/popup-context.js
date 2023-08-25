import { createContext, useState, useCallback, useContext } from 'react';

import FiefConfirmDialog from 'parts/FiefConfirmDialog';

const initInfo = {
  title: 'Alert',
  text: '',
  cancelLabel: 'Ok',
  isError: false,
};
const PopupContext = createContext(null);

const PopupProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState(initInfo);

  const closePopUpHandler = useCallback(() => {
    setOpen(false);
    popupInfo?.closeAction && popupInfo.closeAction();
  }, [setOpen, popupInfo]);

  return (
    <PopupContext.Provider
      value={{
        setOpen,
        setPopupInfo,
      }}>
      {open && (
        <FiefConfirmDialog
          open={open}
          isError={popupInfo?.isError}
          title={popupInfo?.title}
          text={popupInfo?.text}
          confirmLabel={popupInfo?.cancelLabel}
          onConfirm={() =>
            popupInfo?.confirmAction ? popupInfo?.confirmAction : closePopUpHandler()
          }
          onClose={closePopUpHandler}
        />
      )}
      {children}
    </PopupContext.Provider>
  );
};

const usePopup = () => {
  const { setOpen, setPopupInfo } = useContext(PopupContext);

  const setPopUp = useCallback(
    data => {
      setPopupInfo({
        ...initInfo,
        ...data,
      });
      setOpen(true);
    },
    [setPopupInfo, setOpen],
  );

  return {
    setPopUp,
    setOpen,
  };
};

export { PopupProvider, usePopup };
