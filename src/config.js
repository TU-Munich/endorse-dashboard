const port      = process.env.PORT || '3000';
const JwtSecret = process.env.JWT_SECRET  || 'very secret secret';
//const nlpServiceBaseUrl = process.env.NLP_SERVICE_BASE_URL || 'http://localhost:3002/api/1'; // when using data nlp in docker compose
 const nlpServiceBaseUrl = process.env.NLP_SERVICE_BASE_URL || 'http://localhost:5000/api/1';

module.exports = {
  port,
  JwtSecret,
  nlpServiceBaseUrl
};