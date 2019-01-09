const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

var model;

const MAX = 36.5;

async function main() {
    const load = async () => {
        model = await tf.loadModel('file://model/model.json');
    };

    await load();

    let scaledTestDate = [33.08, 32.98, 32.89].map((item)=>item/MAX);

    testData = [scaledTestDate];
    testData = tf.tensor2d(testData);
    testData = tf.reshape(testData, [-1, 3, 1]);

    const r = model.predict(testData);
    let result = r.dataSync()[0];
    console.log(result);
}

main();