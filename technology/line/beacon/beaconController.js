var pIn = 0;
var pOut = 0;
var pCurrent = 0;

const PEOPLE_THRESHOLD = 2;

function increasePIn(callback = undefined) {
    pIn++;
    pCurrent++;

    if(callback && pCurrent >= PEOPLE_THRESHOLD) 
        callback(pCurrent);
}

function increasePOut(callback = undefined) {
    pOut++;
    pCurrent--;

    if(callback && pCurrent >= PEOPLE_THRESHOLD) 
        callback(pCurrent);
}

module.exports = {
    increasePIn: increasePIn,
    increasePOut: increasePOut
}