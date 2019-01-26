var db = require('../server/db/index.js');
var Listings = require('../server/resources/Listing.js');
var {words, dates} = require('./newResources/data.js');



var insertAllData = num => {
    // console.log('database is:', db)
    // console.log('regular console')
    console.time('inserted');
    var count = 0;
    var batch = (batchsize) => {
        var dataArray = [];
        for (var i = 0; i < batchsize; i++) {
            var newListing = {};
            newListing.id = i + count;
            newListing._id = i + count;
            var index1 = Math.floor(Math.random() * 100);
            var index2 = Math.floor(Math.random() * 100);
            var index3 = Math.floor(Math.random() * 100);
            newListing.name = words[index1] + ' ' + words[index2] + ' ' + words[index3];
            newListing.capacity = Math.ceil(Math.random() * 20);
            newListing.cleaningFee = 50 + Math.floor(Math.random() * 151);
            newListing.numReviews = 5 + Math.floor(Math.random() * 196);
            newListing.price = Math.ceil(Math.random() * 5000);
            var availabilityString = '';
            for (var j = 0; j < Math.random() * 40; j++) {
                availabilityString += (45 + Math.ceil(Math.random() * 90));
                availabilityString += '-';
            }
            newListing.availability = availabilityString;
            dataArray.push(newListing);
        }
        count += batchsize;
        return dataArray;
    }

    var insertData = (amount) => {

        var data = batch(amount);
        Listings.insertMany(data)
            .then(() => {
                if (count < num) {
                    insertData(amount);
                } else {
                    console.timeEnd('inserted');
                    return Listings.find().exec()
                    .then ((results) => console.log('results are: ', results))
                    .catch((err) => console.log(err));   
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    insertData(1000);

}

insertAllData(10000000);



// // postgres version
// var pgClient = require('./sqldb/index.js');
// // var Listing = require('../server/resources/Listing.js');
// var {words, dates} = require('./newResources/data.js');

// var insertAllData = (num) => {
//     console.time('inserted');
//     for (var i = 0; i < num; i++) {
//         var newListing = [];
//         newListing.push(i);
//         var index1 = Math.floor(Math.random() * 100);
//         var index2 = Math.floor(Math.random() * 100);
//         var index3 = Math.floor(Math.random() * 100);
//         newListing.push(words[index1] + ' ' + words[index2] + ' ' + words[index3]);
//         newListing.push(Math.ceil(Math.random() * 20));
//         newListing.push(50 + Math.floor(Math.random() * 151));
//         newListing.push(5 + Math.floor(Math.random() * 196));
//         newListing.push(Math.ceil(Math.random() * 5000));
//         var availabilityString = '';
//         for (var j = 0; j < Math.random() * 40; j++) {
//             availabilityString += (45 + Math.ceil(Math.random() * 90));
//             availabilityString += '-';
//         }
//         newListing.push(availabilityString);
//         pgClient.insert(newListing);
//     }
//     console.timeEnd('inserted');
// }

// insertAllData(10000);

// var db = require("../server/db/index.js");
// var Listing = require('../server/resources/Listing.js');
// var { words, dates } = require("./newResources/data.js");
// var exec = require("child_process").exec;

// var createCsvWriter = require("csv-writer").createObjectCsvWriter;
// var csvWriter = createCsvWriter({
//   path: "./records.csv",
//   header: [
//     { id: "_id", title: "_id" },
//     { id: "id", title: "id" },
//     { id: "name", title: "name" },
//     { id: "capacity", title: "capacity" },
//     { id: "cleaningFee", title: "cleaningFee" },
//     { id: "numReviews", title: "numReviews" },
//     { id: "price", title: "price" },
//     { id: "availability", title: "availability" }
//   ]
// });

// var insertAllData = (total, part) => {
//   console.time("create");
//   var count = 0;
//   var batch = batchsize => {
//     var dataArray = [];
//     for (var i = 0; i < batchsize; i++) {
//       var newListing = {};
//       newListing.id = i + count;
//       newListing._id = i + count;
//       var index1 = Math.floor(Math.random() * 100);
//       var index2 = Math.floor(Math.random() * 100);
//       var index3 = Math.floor(Math.random() * 100);
//       newListing.name =
//         words[index1] + " " + words[index2] + " " + words[index3];
//       newListing.capacity = Math.ceil(Math.random() * 20);
//       newListing.cleaningFee = 50 + Math.floor(Math.random() * 151);
//       newListing.numReviews = 5 + Math.floor(Math.random() * 196);
//       newListing.price = Math.ceil(Math.random() * 5000);
//       var availabilityString = "";
//       for (var j = 0; j < Math.random() * 40; j++) {
//         availabilityString += 45 + Math.ceil(Math.random() * 90);
//         availabilityString += "-";
//       }
//       newListing.availability = availabilityString;
//       dataArray.push(newListing);
//     }
//     count += batchsize;
//     return dataArray;
//   };

//   var adder = amount => {
//     var records = batch(amount);
//     csvWriter.writeRecords(records).then(() => {
//       if (count < total) {
//         adder(amount);
//       } else {
//         console.timeEnd("create");
//         console.time("uploaded");
//         adding a possible way to upload from seeding file too
//         var command = 'mongoimport -d listings -c listing --type csv --file records.csv --headerline';
//         exec(command, {maxBuffer: 1024 * 1024 * 500}, (err, stdout, stderr) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.timeEnd('uploaded');
//                 var command = 'rm ./records.csv'
//                 exec(command, {maxBuffer: 1024 * 1024 * 500}, (err, stdout, stderr) => {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log('deleted');
//                     }
//                 })
//             }
//         })
//       }
//     });
//   };

//   adder(part);
// };

// insertAllData(10000000, 100000);

// mongoimport -d listings -c listing --type csv --file records.csv --headerline
