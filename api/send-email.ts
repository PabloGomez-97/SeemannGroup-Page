import sendEmailHandler from '../server/handlers/send-email';

export default sendEmailHandler;

export const config = {
  runtime: 'nodejs20.x',
  maxDuration: 30,
};
