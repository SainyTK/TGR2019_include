const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

var csv = require("fast-csv");
var xs = [];
var ys = [];

var data = [];

function range(start, end) {
    var ans = [];
    for (let i = start; i < end; i++) {
        ans.push(i);
    }
    return ans;
}

function readCSV() {
    return new Promise(function (resolve, reject) {
        csv
            .fromPath("./data/THB.csv")
            .on("data", function (str) {
                data.push(str);
            })
            .on("end", function () {
                resolve(data);
            });
    });
}


async function prepareData() {

    await readCSV();

    MAX = -999.0;
    const len = data.length
    for (i = 0; i < len; i++) {
        if (MAX <= parseFloat(data[i][1])) {
            MAX = parseFloat(data[i][1]);
        }
    }

    dataset = data.map((number) => {
        return parseFloat(number[1])/MAX;
    })

    const TIME_STEP = 3;
    const NUM_OUT = 0;

    let arr = range(TIME_STEP, dataset.length - (NUM_OUT + 1));

    arr.forEach(function (i) {
        let x = [];
        for (let j = i-TIME_STEP ; j < i ; j++) {
            x.push(dataset[j]);
        }
        xs.push(x);

        ys.push(dataset[i]);
    });

    console.log(xs);
    console.log(ys);
}

var model = tf.sequential();

//input
model.add(tf.layers.lstm({
    units: 10,  // 50 node if more will slower
    inputShape: [3, 1], // input 3 time steps each time step 1 dimension  e.g. [10,20,30]
    returnSequences: false
}));

//output
model.add(tf.layers.dense({
    units: 1,   // 1 output
    kernelInitializer: 'VarianceScaling',
    activation: 'relu'
}));

const LEARNING_RATE = 0.001;
const optimizer = tf.train.adam(LEARNING_RATE);

model.compile({
    optimizer: optimizer,
    loss: 'meanSquaredError',
    metrics: ['accuracy'],
});

async function main() {
    async function trainModel() {
        const history = await model.fit(
            trainXS,
            trainYS,
            {
                batchSize: 1,   //bunch of data
                epochs: 10,     //round of training
                shuffle: true,      //random select data 
                validationSplit: 0.2    // split 20 %, test 80 %
            });
    }
    await prepareData();
    trainXS = tf.tensor2d(xs);
    trainXS = tf.reshape(trainXS, [-1, 3, 1])   //[numofdata, recursive round, dimen of feature of input]   -1 means any

    trainYS = tf.tensor1d(ys);  //model need 2 
    trainYs = tf.reshape(trainYS, [-1, 1])  //[num of result, num if feature output]

    // await trainModel();
    // await model.save('file://model');

    const load = async () => {
        model = await tf.loadModel('file://model/model.json');
    };

    await load();

    let scaledTestDate = []
    let arr = range(5, 8);
    arr.forEach(i => {
        scaledTestDate.push(dataset[i]);
    });

    testData = [scaledTestDate];
    testData = tf.tensor2d(testData);
    testData = tf.reshape(testData, [-1, 3, 1]);

    const r = model.predict(testData);
    let result = r.dataSync()[0];
    console.log(result*MAX);
}

main();