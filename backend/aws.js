const AWS = require('aws-sdk');

/*
# These settings can be used if no propper IAM roles are set up or when running locally
AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID});
AWS.config.update({secretAccessKey: process.env.AWS_ACCESS_KEY});
AWS.config.update({region: process.env.AWS_REGION});
*/

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;