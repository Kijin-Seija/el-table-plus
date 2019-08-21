/**
 * promise包装器，将带有callback回调的function包装成返回promise对象的函数，callback须遵守callback(error, data) 回调约定
 */
module.exports = function (originalFunction) {
  return function (...args) {
    return new Promise(function (resolve, reject) {
      originalFunction.call(this, ...args, (error, data) => {
        if (error) {
          reject(error);
        }
        else {
          resolve(data);
        }
      });
    });
  };
};
