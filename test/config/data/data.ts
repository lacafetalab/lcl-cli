const fs = require("fs");
const YAML = require("yaml");
const path = require('path');

const configPath = path.join(__dirname, 'user.yml');
const file = fs.readFileSync(configPath, "utf8");

export function complete() {
    return YAML.parse(file);
}


export function twoCompletedComfig() {
    const dataOne = YAML.parse(file);
    const dataTwo = YAML.parse(file);
    dataOne.name = "UserOne";
    dataTwo.name = "UserTwo";
    return [dataOne, dataTwo];
}


export function withoutEvent(){
    // tslint:disable-next-line:no-shadowed-variable
    const configPath = path.join(__dirname, 'withoutEventUser.yml');
    // tslint:disable-next-line:no-shadowed-variable
    const file = fs.readFileSync(configPath, "utf8");
    return YAML.parse(file);
}

