var pIn = 0;
var pOut = 0;
var pCurrent = 0;

let currentUsers = []

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

function addUser(userId) {
    currentUsers.push(userId);
}

function removeUser(userId) {
    currentUsers = currentUsers.filter((item) => item != userId)
}

module.exports = {
    increasePIn,
    increasePOut,
    addUser,
    removeUser,
    currentUsers
}