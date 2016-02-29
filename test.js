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
    assert.equal(app._debugPrefix, 'base');
    assert.equal(app._debugNamespace, 'base:bar');
    assert.equal(app._debugSuffix, 'bar');
  });

  it('should take a complex namespace', function() {
    app.debug('bar:one', 123, 'foo:qux:two', 'four', 'five:six')('hello world');
    //=> base:bar:one:foo:qux:two:four:five:six hello world

    assert.equal(app._debugPrefix, 'base');
    assert.equal(app._debugNamespace, 'base:bar:one:foo:qux:two:four:five:six');
    assert.equal(app._debugSuffix, 'bar:one:foo:qux:two:four:five:six');
  });

  it('should be able to pass custom namespaces', function() {
    var base = new Base();
    base.use(debug(['helper', 'engine']));
    base.debug.helper('loading foo helper');
    //=> base:helper loading foo helper

    assert.equal(base._debugPrefix, 'base');
    assert.equal(base._debugNamespace, 'base:helper');
    assert.equal(base._debugSuffix, 'helper');
    assert.equal(typeof base.debug.engine, 'function');
  });

  it('should create new namespace with `app.debug()`', function() {
    var base = new Base();
    base.use(debug());

    base.debug.item = base.debug('collection:item');
    base.debug.item('loading collection item');
    //=> base:collection:item loading collection item

    assert.equal(base._debugPrefix, 'base');
    assert.equal(base._debugNamespace, 'base:collection:item');
    assert.equal(base._debugSuffix, 'collection:item');
  });
});
