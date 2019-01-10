const csv = require('fast-csv');

async function readCSV() {
    let data = [];
    return new Promise(function (resolve, reject) {
        csv
            .fromPath("./data/sanam.csv")
            .on("data", function (str) {
                data.push(str);
            })
            .on("end", function () {
                resolve(data);
            });
    });
}

async function extractData() {
    let dataFromFile = await readCSV();

    let data = dataFromFile.slice(1, dataFromFile.length);
    data = data.map((item) => {

        let itemArr = item[0].split(';');

        let obj = {
            day: itemArr[0],
            values: itemArr.slice(1, itemArr.length),
        }

        return obj;
    })

    return data;
} 

module.exports = {
    extractData
}