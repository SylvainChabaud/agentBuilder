const loaderStyles = {
  display: 'inline-block',
  position: 'relative',
  width: '24px',
  height: '24px',
  marginLeft: '8px',

  '&:before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: '2px solid #3b82f6',
    borderTopColor: 'transparent',
    animation: 'spin 0.8s linear infinite',
  },
};
