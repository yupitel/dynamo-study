const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-northeast-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const fnScan = (docClient) => {
    return new Promise((resolve, reject) => {
        var params = {
            TableName: "cities"
        };
    
        docClient.scan(params, function(err, data) {
            if (err) {
                console.error("Unable to get cities",JSON.stringify(err, null, 2));
                console.error("key = " + key);
                resolve(err);
            } else {
                var str_out = ""
                data.Items.forEach(function(city) {
                str_out += city.key + "\t"
                     + city.name + "\t"
                     + city.population + "\t"
                     + city.date_mod + "\n"
                    })
    
                console.log(str_out)
            }
        });
    });
};



const main = async() => {
  try {
      await fnScan(docClient);
  } catch(err) {
      console.log(err);
  }  
};
  
main();
