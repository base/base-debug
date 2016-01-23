'use strict';

var Base = require('base');
var debug = require('..');

/**
 * From the root of this project (the same directory as package.json),
 * run the following command (mac):
 *
 *    DEBUG=base:* node examples/base
 *
 */

function pluginOne() {
  return function() {
    this.use(debug('one'));

    var foo = this.debug('foo');
    var bar = this.debug('bar');

    this.define('foo', function(key) {
      foo('adding foo: %s', key);
    });

    this.define('bar', function(key) {
      bar('adding bar: %s', key);
    });
  }
}

function pluginTwo() {
  return function() {
    this.use(debug('two'));

    var baz = this.debug('baz');
    var qux = this.debug('qux');

    this.define('baz', function(key) {
      baz('adding baz: %s', key);
    });

    this.define('qux', function(key) {
      qux('adding qux: %s', key);
    });
  }
}

function pluginThree() {
  return function() {
    this.use(debug('three'));
    var fez = this.debug();

    this.define('fez', function(key) {
      fez('adding fez: %s', key);
    });
  }
}

var base = new Base();
base.use(pluginOne());
base.use(pluginTwo());
base.use(pluginThree());

base.foo('aaa');
base.bar('bbb');
base.baz('ccc');
base.qux('ddd');
base.fez('zzz');
