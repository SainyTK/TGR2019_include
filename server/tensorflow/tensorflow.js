const tf = require('@tensorflow/tfjs');
var csv = require("fast-csv");
require('@tensorflow/tfjs-node');

const LEARNING_RATE = 0.001;
const TIME_STEP = 3;
const NUM_OUT = 0;

var model;
var dataset = [];
var MAX = -999;

//prepare data
async function prepareData() {
    let data = await readCSV();

    const len = data.length;
    for (i = 0; i < len; i++) {
        if (MAX <= parseFloat(data[i][1])) {
            MAX = parseFloat(data[i][1]);
        }
    }

    dataset = data.map((number) => {
        return parseFloat(number[1]) / MAX;
    })

    let arr = range(TIME_STEP, dataset.length - (NUM_OUT + 1));

    arr.forEach(function (i) {
        let x = [];
        for (let j = i - TIME_STEP; j < i; j++) {
            x.push(dataset[j]);
        }
        xs.push(x);

        ys.push(dataset[i]);
    });
}

//create model
function createModel() {
    model = tf.sequential();
    //input

    model.add(tf.layers.lstm({
        units: 10,  // 50 node if more will slower
        inputShape: [TIME_STEP, 1], // input 3 time steps each time step 1 dimension  e.g. [10,20,30]
        returnSequences: false
    }));

    //output
    model.add(tf.layers.dense({
        units: 1,   // 1 output
        kernelInitializer: 'VarianceScaling',
        activation: 'relu'
    }));

    const optimizer = tf.train.adam(LEARNING_RATE);

    model.compile({
        optimizer: optimizer,
        loss: 'meanSquaredError',
        metrics: ['accuracy'],
    });
}

//train model
async function trainModel() {
    trainXS = tf.tensor2d(xs);
    trainXS = tf.reshape(trainXS, [-1, TIME_STEP, 1])   //[numofdata, recursive round, dimen of feature of input]   -1 means any

    trainYS = tf.tensor1d(ys);  //model need 2 
    trainYs = tf.reshape(trainYS, [-1, 1])  //[num of result, num if feature output]
    await model.fit(
        trainXS,
        trainYS,
        {
            batchSize: 1,   //bunch of data
            epochs: 10,     //round of training
            shuffle: true,      //random select data 
            validationSplit: 0.2    // split 20 %, test 80 %
        });
}

//save
async function saveModel() {
    model.save('file://model');
}

//load
async function loadModel() {
    model = await tf.load('file://model/model.json');
}

//create test set
function createTestData(start) {
    let testData = []
    let arr = range(start, start + TIME_STEP);
    arr.forEach(i => {
        testData.push(dataset[i]);
    });

    testData = [testData];
    testData = tf.tensor2d(testData);
    testData = tf.reshape(testData, [-1, TIME_STEP, 1]);
}

//predict
function predict(input) {
    const r = model.predict(input);
    let result = r.dataSync()[0];
    console.log(result * MAX);
}

function range(start, end) {
    var ans = [];
    for (let i = start; i < end; i++) {
        ans.push(i);
    }
    return ans;
}

function readCSV() {
    let data = [];
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
