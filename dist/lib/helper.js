"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resolve = void 0;

class Resolve {
  success(msg = 'success', errorCode = 0, code = 200) {
    return {
      msg,
      code,
      errorCode
    };
  }

  json(data, msg = 'success', errorCode = 0, code = 200) {
    return {
      code,
      msg,
      errorCode,
      data
    };
  }

}

exports.Resolve = Resolve;