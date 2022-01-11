/**
 * revealing module pattern
 */
// const myModule = (() => {
//   const privateFoo = () => {};
//   const privateBar = [];

//   const exported = {
//     publicFoo: () => {},
//     publicBar: () => {},
//   };

//   return exported;
// })();

// console.log(myModule);
// console.log(myModule.privateFoo, myModule.privateBar);

/**
 * require function
 */
// function require(moduleName) {
//   console.log(`Require invoked for module: ${moduleName}`);
//   const id = require.resolve(moduleName); // 모듈의 전체 경로 찾아냄
//   if (require.cache[id]) {
//     return require.cache[id].exports; // 캐시된 모듈일시 즉시 반환
//   }

//   const module = {
//     exports: {},
//     id,
//   };

//   require.cache[id] = module;

//   loadModule(id, module, require);

//   return module.exports;
// }

// require.cache = {};
// require.resolve = (moduleName) => {};

function require(/* ... */) {
  const module = { exports: {} };
  ((module, exports) => {
    // Module code here. In this example, define a function.
    function someFunc() {}
    console.log(module.exports === exports);
    exports = someFunc;
    console.log("exports = someFunc");
    console.log(module.exports === exports);
    console.log(module.exports);
    console.log(exports);
    console.log(module);
    // At this point, exports is no longer a shortcut to module.exports, and
    // this module will still export an empty default object.
    module.exports = someFunc;
    console.log("module.exports = someFunc");
    console.log(module.exports === exports);
    console.log(module.exports);
    console.log(exports);
    console.log(module);
    // At this point, the module will now export someFunc, instead of the
    // default object.
  })(module, module.exports);
  console.log(module);
  console.log(module.exports);
  return module.exports;
}

const m = require();
console.log(m);
