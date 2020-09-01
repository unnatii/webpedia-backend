 const {
    PORT = 5000,
    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    SESS_SECRET = 'secret!session',
    SESS_LIFETIME = 1000 * 60 * 60 * 2,
    EMAIL_LOGIN='unnatiitibrewal@gmail.com',
    EMAIL_PASSWORD='loveyou3000!'
    
  } = process.env;

module.exports={PORT,SESS_NAME,SESS_SECRET,SESS_LIFETIME,EMAIL_LOGIN,EMAIL_PASSWORD}