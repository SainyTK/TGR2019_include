const tf = require('@tensorflow/tfjs');
var csv = require("fast-csv");
require('@tensorflow/tfjs-node');

const TRAIN_ROUND = 5;
const LEARNING_RATE = 0.001;
const TIME_STEP = 1;
const NUM_OUT = 0;

var model;
var xs = [];
var ys = [];
var dataset = [];
var MAX = -999;

var modelAvailable = false;

//prepare data
async function prepareData() {

    modelAvailable = false;

    let data = await readCSV();
    let numVisitor = [];

    data = data.slice(1, data.length);

    data.forEach((row) => {
        let rowArr = row[0].split(';');
        for (let i = 1; i < rowArr.length; i++) {
            numVisitor.push(parseInt(rowArr[i]));
        }
    })

    const len = numVisitor.length;

    for (i = 0; i < len; i++) {
        if (MAX <= numVisitor[i]) {
            MAX = numVisitor[i];
        }
    }

    dataset = numVisitor.map((number) => {
        return number/MAX;
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
            epochs: TRAIN_ROUND,     //round of training
            shuffle: true,      //random select data 
            validationSplit: 0.2    // split 20 %, test 80 %
        });
}

//save
async function saveModel() {
    await model.save('file://model');
}

//load
async function loadModel() {
    model = await tf.loadModel('file://model/model.json');

    modelAvailable = true;
}

//create test set
function createTestData(start) {
    let testData = []
    let arr = range(start, start + TIME_STEP);
    arr.forEach(i => {
        testData.push(dataset[i]);
    });

    return testData;
}

function toTensor(dSet) {
    dSet = [dSet];
    dSet = tf.tensor2d(dSet);
    dSet = tf.reshape(dSet, [-1, TIME_STEP, 1]);
    return dSet;
}

//predict
function predict(input) {
    if(!modelAvailable)
        return -1;
    const r = model.predict(input);
    let result = r.dataSync()[0] * MAX;
    return result;
}

function predictN(input, numNext) {
    if(!modelAvailable)
        return -1;
    let res = [];
    for (let i=0; i<numNext; i++) {
        let predRes = predict(toTensor(input));

        input = input.slice(1, input.length);
        input.push(res/MAX);

        res.push(Math.round(predRes));
        console.log(`ผู้เข้าชมในอีก ${i+1} ชั่วโมง ประมาณ ${predRes} คน`);
    }

    let result = {
        number_of_tourist: res
    }
    return result;
}

//test model
function testModel(start, numNext) {
    let testSet = createTestData(start);
    return predictN(testSet, numNext);
}

function scaleData(dataset) {
    return dataset.map((data) => parseFloat(data)/MAX);
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
            .fromPath("./data/sanam.csv")
            .on("data", function (str) {
                data.push(str);
            })
            .on("end", function () {
                resolve(data);
            });
    });
}

async function init() {
    await prepareData();
    createModel();
    // await trainModel();
    // await saveModel();
    await loadModel();
}

module.exports = {
    init,
    predict,
    testModel
}