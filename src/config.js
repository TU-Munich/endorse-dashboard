const port      = process.env.PORT || '3000';
const JwtSecret = process.env.JWT_SECRET  || 'very secret secret';
const nlpServiceBaseUrl = process.env.NLP_SERVICE_BASE_URL || 'http://localhost:5002/api/1';

module.exports = {
  port,
  JwtSecret,
  nlpServiceBaseUrl
};