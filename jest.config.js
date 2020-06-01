const coverageThreshold = 60;
const collectCoverageFrom = [
    "src/sdk/**/*.ts",
    "!node_modules/**"
];

module.exports = {
    "roots": [
        "<rootDir>/test"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    coverageThreshold: {
        global: {
            branches: 40,
            functions: coverageThreshold,
            lines: coverageThreshold,
            statements: coverageThreshold
        }
    },
    collectCoverageFrom
}