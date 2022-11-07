const changeCase = require('change-case');

module.exports = {
  helpers: {
    toPascalCase(text) {
      return changeCase.pascalCase(text);
    },
  }
};
