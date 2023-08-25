const DEFAULT_ERROR_MESSAGES = [
  {
    error: 'user rejected transaction',
    message: 'You rejected this transaction.',
  },
];

const getTransactionErrorMessage = ({
  error,
  mainTxErrorMessage = 'There is an error in the Transaction',
  exceptionTxErrorMessages = [],
}) => {
  let transactionErrorMessage = mainTxErrorMessage;

  const errorMessages = [...DEFAULT_ERROR_MESSAGES, ...exceptionTxErrorMessages];
  for (const errorMessage of errorMessages) {
    if (error.search(errorMessage.error) !== -1) {
      transactionErrorMessage = errorMessage.message;
    }
  }

  return transactionErrorMessage;
};

export default getTransactionErrorMessage;
