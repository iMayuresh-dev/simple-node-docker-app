module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',  // Use babel-jest to transform .js files
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',  // Adjusts module paths for .js files
  },
}