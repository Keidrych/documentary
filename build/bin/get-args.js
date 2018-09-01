let argufy = require('argufy'); if (argufy && argufy.__esModule) argufy = argufy.default;

const getArgs = () => {
  return argufy({
    source: {
      command: true,
    },
    toc: {
      short: 't',
      boolean: true,
    },
    watch: {
      short: 'w',
      boolean: true,
    },
    output: 'o',
    push: {
      short: 'p',
    },
    generate: {
      short: 'g',
      description: 'Process a JavaScript file to include typedef documentation in their source code. The target file should contain `/* documentary path/to/types.xml */` marker in place where types are to be inserted.',
    },
    version: {
      short: 'v',
      boolean: true,
    },
    extract: {
      short: 'e',
      description: 'Extract @typedef JSDoc comments and place them in a file.',
    },
  })
}

module.exports=getArgs
//# sourceMappingURL=get-args.js.map