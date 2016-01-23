'use strict';

var Base = require('base');
var debug = require('..');

function baseFoo(options) {
  return function(app) {
    app.use(debug('foo'));

    // namespace `foo:one`
    var one = app.debug('one');

    // namespace `foo:two`
    var two = app.debug('two');

    // then use it like this:
    one('yelling a: %s', 'A!');
    one('yelling b: %s', 'B!');
    one('yelling c: %s', 'C!');

    two('yelling x: %s', 'X!');
    two('yelling y: %s', 'Y!');
    two('yelling z: %s', 'Z!');
  }
}

var base = new Base();
base.use(baseFoo());
