/*!
 * base-debug <https://github.com/jonschlinkert/base-debug>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function(prefix) {
  var debug = require('debug');

  return function(app) {
    this.define('debug', function(name) {
      var fn = debug(namespace(prefix, name));
      return function() {
        return fn.apply(debug, arguments);
      };
    });
  };
};

function namespace(prefix, subname) {
  var args = [].slice.call(arguments).filter(Boolean);
  var name = 'base';
  if (args.length === 1) {
    name += ':' + args[0];
  }
  if (args.length === 2) {
    name += ':' + args.join(':');
  }
  return name;
}
