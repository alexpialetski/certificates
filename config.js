const env = {};

module.exports = {
  mongodbUri: 'mongodb://localhost:27017/certificates',
  port: env.PORT || 8080,
  host: env.HOST || 'localhost',
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  }
};
