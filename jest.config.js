const coverageThreshold = 60;
const collectCoverageFrom = [
    "src/sdk/**/*.ts",
    "!node_modules/**"
];

const moduleNameMapper={
    '^@sdk/(.*)$': '<rootDir>/src/sdk/$1'
  };

module.exports = {
    "roots": [
        "<rootDir>/src"
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
    collectCoverageFrom,
    moduleNameMapper
}