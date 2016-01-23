'use strict';

var Base = require('base');
var plugin = require('..');

// given you have a plugin named `base-foo`
function baseFoo(options) {
  return function(app) {
    app.use(plugin('foo'));

    // then call the `app.debug` method
    var debug = app.debug();

    // then use it like this:
    debug('yelling abc: %s', 'ABC!');
    debug('yelling xyz: %s', 'XYZ!');
  }
}

var base = new Base();
base.use(baseFoo());
