const fs = require("fs");
const YAML = require("yaml");
const path = require('path');

const configPath = path.join(__dirname, 'user.yml');
const file = fs.readFileSync(configPath, "utf8");

export function complete() {
    return YAML.parse(file);
}
