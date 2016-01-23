'use strict';

require('mocha');
var assert = require('assert');
var debug = require('./');
var Base = require('base');
var app;

describe('base-debug', function() {
  beforeEach(function() {
    app = new Base();
    app.use(debug('foo'));
  });

  it('should export a function', function() {
    assert.equal(typeof debug, 'function');
  });

  it('should expose a `debug` method on app', function() {
    assert.equal(typeof app.debug, 'function');
  });

  it('should return a function', function() {
    assert.equal(typeof app.debug(), 'function');
  });

  it('should take a namespace', function() {
    var debug = app.debug('bar');
    debug('debugging %s', 'whatever');
  });
});
