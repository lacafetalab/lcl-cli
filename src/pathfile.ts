import {readYaml} from "./Util";
import {Config} from "@sdk/config/Config";

const path = require('path');
const configPath = path.join(__dirname, 'user.yml');
const _data = readYaml(configPath);
const config = new Config(_data);

console.log(config.properties);