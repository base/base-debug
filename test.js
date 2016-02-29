'use strict';

var assert = require('assert');
var debug = require('./index');
var Base = require('base');
var app = null;

describe('base-debug', function() {
  beforeEach(function() {
    app = new Base();
    app.use(debug());
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
    assert.equal(app._namespace, 'base');
    assert.equal(app._debugNamespace, 'base:bar');
  });

  it('should take a complex namespace', function() {
    app.debug('bar:one', 123, 'foo:qux:two', 'four', 'five:six')('hello world');
    //=> base:bar:one:foo:qux:two:four:five:six hello world

    assert.equal(app._namespace, 'base');
    assert.equal(app._debugNamespace, 'base:bar:one:foo:qux:two:four:five:six');
  });

  it('should not have built-in debug namespaces', function() {
    app.debug('two')('wooo hooo');
    //=> base:two wooo hooo

    assert.equal(typeof app.debug.context, 'undefined');
    assert.equal(typeof app.debug.engine, 'undefined');
    assert.equal(typeof app.debug.helper, 'undefined');
    assert.equal(app._debugNamespace, 'base:two');
  });

  it('should be able to pass custom namespaces', function() {
    var base = new Base();
    base.use(debug(['helper', 'engine']));
    base.debug.helper('loading foo helper');
    //=> base:helper loading foo helper

    assert.equal(base._debugNamespace, 'base:helper');
    assert.equal(typeof base.debug.engine, 'function');
  });

  it('should create new namespace with `app.debug()`', function() {
    var base = new Base();
    base.use(debug());

    base.debug.item = base.debug('collection:item');
    base.debug.item('loading collection item');
    //=> base:collection:item loading collection item
  });
});
