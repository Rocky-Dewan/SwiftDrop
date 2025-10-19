export const sendEmail = async ({ to, subject, text, html }) => {
  // stub: integrate SendGrid/Mailgun/SMTP in production
  console.log("sendEmail stub:", { to, subject });
  return true;
};
