/*!
 * base-debug <https://github.com/jonschlinkert/base-debug>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * Plugin that adds `debug` method to the instance
 * and `namespaces` are added to this method.
 *
 * ```js
 * app.debug()('debugging on main namespace')
 * //=> base debugging on main namespace
 *
 * app.debug.one = app.debug('one')
 * app.debug.one('testing %s, whatever', 'foo, bar')
 * //=> base:one testing foo, bar, whatever
 *
 * app.debug.mix = app.debug('two', 123 'three:four', 'five')
 * app.debug.mix('okey, %s awesome', 'this is')
 * //=> base:two:three:four:five okey, this is awesome
 *
 * app.debug.helper('is one of internal namespaces added')
 * //=> base:helper is one of internal namespaces added
 * ```
 *
 * @name   debug
 * @param  {Array} `namespaces`
 * @return {Function}
 */

module.exports = function debugPlugin(namespaces) {
  namespaces = Array.isArray(namespaces) ? namespaces : [namespaces];

  return function plugin(app) {
    app.define('_debugNamespace', app._namespace);
    app.define('debug', function debug() {
      return debugFactory.apply(app, arguments);
    });
    if (namespaces.length) {
      var len = namespaces.length;
      var i = 0;

      while (i < len) {
        var ns = namespaces[i++];
        app.debug[ns] = debugFactory.call(app, ns);
        app.debug[ns].color = app.debug.color;
      }
    }
  };
};

function debugFactory() {
  var app = this;
  var args = [].slice.call(arguments);
  var segs = app._namespace.split(':');
  var len = args.length;
  var i = 0;

  while (i < len) {
    var val = args[i++];
    if (typeof val === 'string') {
      segs.push.apply(segs, val.split(':'));
    }
  }

  return function debug() {
    var fn = require('debug');
    var namespace = segs.join(':');
    app.define('_debugNamespace', namespace);
    fn(namespace).apply(fn, arguments);
    return app;
  };
}
