import {DataManagement} from "../../../src/sdk/config/DataManagement";

const fs = require("fs");
const YAML = require("yaml");
const path = require('path');


function readUser() {
    const configPath = path.join(__dirname, 'user.yml');
    const file = fs.readFileSync(configPath, "utf8");
    return YAML.parse(file);
}

function readAddress() {
    const configPath = path.join(__dirname, 'address.yml');
    const file = fs.readFileSync(configPath, "utf8");
    return YAML.parse(file);
}

export function complete() {
    return readUser();
}

export function entitiesWithEntityDependencies() {
    return readAddress();
}


export function twoCompletedComfig() {
    const dataOne = readUser();
    const dataTwo = readUser();
    dataOne.name = "UserOne";
    dataTwo.name = "UserTwo";
    return [dataOne, dataTwo];
}


export function withoutEvent() {
    const configPath = path.join(__dirname, 'withoutEventUser.yml');
    const file = fs.readFileSync(configPath, "utf8");
    return YAML.parse(file);
}

export function twoEntitiesDependents() {
    return [readUser(), readAddress()];
}