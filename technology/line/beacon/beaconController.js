var pIn = 0;
var pOut = 0;

let currentUsers = []

const PEOPLE_THRESHOLD = 2;

function increasePIn(callback = undefined) {
    pIn++;

    if(callback && Math.abs(pIn - pOut) >= PEOPLE_THRESHOLD) 
        callback();
}

function increasePOut(callback = undefined) {
    pOut++;

    if(callback && Math.abs(pIn - pOut) >= PEOPLE_THRESHOLD) 
        callback();
}

function addUser(userId) {
    currentUsers.push(userId);
}

function removeUser(userId) {
    currentUsers = currentUsers.filter((item) => item != userId)
}

function getPIn() {
    return pIn;
}

function getPOut() {
    return pOut;
}

module.exports = {
    increasePIn,
    increasePOut,
    addUser,
    removeUser,
    currentUsers,
    getPIn,
    getPOut
}