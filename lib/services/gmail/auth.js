export const handleGmailAuth = (redirect) => {
  window.location.href = `/api/gmail/auth?redirect=${redirect}`;
};
