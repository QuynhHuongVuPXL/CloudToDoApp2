const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION || 'us-west-2' });
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;
