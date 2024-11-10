const AWS = require('aws-sdk');
const uuid = require('uuid');

// Initialize DynamoDB DocumentClient and region
AWS.config.update({ region: process.env.AWS_REGION || 'us-west-2' });
const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.AWS_TABLE_NAME || "todo";  // Use a default name if env variable is not set

// Get all todos
exports.getTodos = (req, res) => {
    const params = {
        TableName: tableName
    };

    docClient.scan(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.json(data.Items);
        }
    });
};

// Create a new todo
exports.createTodo = (req, res) => {
    const item = req.body;
    item._id = uuid.v1();  // Generate unique ID for the item
    item.completed = false;

    const params = {
        TableName: tableName,
        Item: item
    };

    docClient.put(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.json(data);
        }
    });
};

// Update a todo
exports.updateTodo = (req, res) => {
    const item = req.body;

    const params = {
        TableName: tableName,
        Key: {
            _id: item._id
        },
        UpdateExpression: 'set completed = :val',
        ExpressionAttributeValues: {
            ':val': item.completed
        },
        ReturnValues: 'ALL_NEW'
    };

    docClient.update(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.json(data.Attributes);
        }
    });
};

// Delete a todo
exports.deleteTodo = (req, res) => {
    const itemId = req.params.id;

    const params = {
        TableName: tableName,
        Key: {
            _id: itemId
        }
    };

    docClient.delete(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.json({ message: "Todo deleted successfully" });
        }
    });
};

