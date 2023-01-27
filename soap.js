const soap = require('soap');
const json2csv = require('json2csv').parse;
const Jsftp = require("jsftp");

const ftp = new Jsftp({
  host: "ftp.example.com",
  user: "username",
  pass: "password"
});

const url = 'https://example.com/soap?wsdl';
const args = {productIds: [1, 2, 3]};

soap.createClient(url, function(err, client) {
    client.getInventoryCount(args, function(err, result) {
        const inventoryCounts = result.getInventoryCountReturn;
        const csv = json2csv(inventoryCounts);
        ftp.put(csv, '/path/to/inventory.csv', function(hadError) {
            if (!hadError) {
                console.log("File transferred successfully!");
            } else {
                console.log("There was an error transfering the file.");
            }
            ftp.raw.quit();
        });
    });
});

