
const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-northeast-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();


const fnInsert = (docClient, key, name, population, date_mod) => {
    return new Promise(async (resolve, reject) => {
        const params = {
            TableName: "cities",
            Item: {
                "key":  key,
                "name": name,
                "population":  population,
                "date_mod": date_mod,
                "places": ['01', '02', '03', 4, 5]
            }
        };
    
        const data = await docClient.put(params).promise()
            .catch((err) => { reject(err); });
        resolve(data);
    });
};


const main = async() => {

  console.log("Importing into DynamoDB. Please wait.")
  
  try {
    await fnInsert(docClient,"t0921","宇都宮",37814,"2003-9-15");
    await fnInsert(docClient,"t0922","小山",28167,"2003-8-22");
    await fnInsert(docClient,"t0923","佐野",97125,"2003-7-9");
    await fnInsert(docClient,"t0924","足利",57819,"2003-6-11");
  } catch(err) {
      console.log(err);
  }

};

main();
