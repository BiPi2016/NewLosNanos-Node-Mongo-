const chalk = require('chalk');
const bcrypt = require('bcrypt');

const saltRounds = 12;

module.exports = {
    log,
    yLog,
    debug,
    hashIt,
    unhashIt
}

function log(msg) {
    console.log(chalk.cyanBright(msg));
}

function yLog(msg) {
    console.log(chalk.yellow.bold(msg));
}

function debug(msg) {
    console.log(chalk.bgWhiteBright.redBright.bold.underline(msg));
}

// Hashes passwords
function hashIt(password) {
    return new Promise( (resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err)
                return reject(err);
            console.log('passwordHash created: ' + hash);
            return resolve(hash);
        });
    });
}

// Decodes Passwords
function unhashIt(password, passwordHash) {
    return new Promise( (resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, result) => {
            if(err)
                return reject(err);
            console.log('checking password ' + password);
            console.log('checking passwordHash ' + passwordHash);
            console.log('Result of comparison ' + result);            
            return resolve(result);
        });
    });
}
