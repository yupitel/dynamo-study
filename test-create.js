const AWS = require("aws-sdk")

AWS.config.update({
  region: "ap-northeast-1"
})

const dynamodb = new AWS.DynamoDB()

const params = {
    TableName : "cities",
    KeySchema: [       
        { AttributeName: "key", KeyType: "HASH"},
    ],
    AttributeDefinitions: [       
        { AttributeName: "key", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
}

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2))
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2))
    }
});
