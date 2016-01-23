# base-debug [![NPM version](https://img.shields.io/npm/v/base-debug.svg)](https://www.npmjs.com/package/base-debug) [![Build Status](https://img.shields.io/travis/jonschlinkert/base-debug.svg)](https://travis-ci.org/jonschlinkert/base-debug)

> Plugin for debugging your base application.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i base-debug --save
```

## Usage

To test-drive the plugin, add this to `example.js` (or just use the [examples/example.js](examples/example.js) file in this project):

```js
var debug = require('base-debug');
var Base = require('base');
var base = new Base();

base.use(debug('foo'));

var one = base.debug('one');
var two = base.debug('two');

one('this is one!');
two('this is two!');
```

Then, in the command line:

* run `DEBUG=base:* node example`
* then try `DEBUG=base:one node example`

_(See the [debug docs](https://github.com/visionmedia/debug) for more information about using debug on all platforms.)_

**Namespace**

Inside your plugin, register the `debug()` plugin, passing the name of your plugin as the "namespace" to use:

```js
// given you have a plugin named `base-foo`
function baseFoo(options) {
  return function(app) {
    app.use(debug('foo'));

    // then call the `app.debug` method
    var debug = app.debug();
    
    // then use it like this:
    debug('yelling abc: %s', 'ABC!');
    debug('yelling xyz: %s', 'XYZ!');
  }
}
```

When your plugin is registered, like this:

```js
// Add your plugin
var base = new Base();
base.use(baseFoo());
```

and the `DEBUG=base:foo` command is used, you should see something like this in the terminal:

<img width="564" alt="base-debug plugin - namespaces" src="https://cloud.githubusercontent.com/assets/383994/12530707/2d32554c-c1b5-11e5-8d56-9a9f0259dad0.png">

_(See the [debug docs](https://github.com/visionmedia/debug) for more information about using debug on all platforms.)_

**Sub-namespaces**

Optionally use "sub-namespaces":

```js
function baseFoo(options) {
  return function(app) {
    app.use(debug('foo'));
  
    // namespace `foo:one`
    var one = app.debug('one');

    // namespace `foo:two`
    var two = app.debug('two');
    
    // then use it like this:
    one('yelling abc: %s', 'ABC!');
    two('yelling xyz: %s', 'XYZ!');
  }
}
```

When your plugin is registered, like this:

```js
// Add your plugin
var base = new Base();
base.use(baseFoo());
```

and the following commands are used:

* `DEBUG=base:foo:*`, or
* `DEBUG=base:foo:one`, or
* `DEBUG=base:foo:two`

You should see something like this in the terminal:

<img width="567" alt="screen shot 2016-01-23 at 9 36 39 am" src="https://cloud.githubusercontent.com/assets/383994/12530703/23fedd1a-c1b5-11e5-9168-8ea1d4cb5c67.png">

_(See the [debug docs](https://github.com/visionmedia/debug) for more information about using debug on all platforms.)_

## Related projects

You might also be interested in these projects:

* [base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://www.npmjs.com/package/base) | [homepage](https://github.com/node-base/base)
* [base-fs](https://www.npmjs.com/package/base-fs): base-methods plugin that adds vinyl-fs methods to your 'base' application for working with the file… [more](https://www.npmjs.com/package/base-fs) | [homepage](https://github.com/jonschlinkert/base-fs)
* [base-options](https://www.npmjs.com/package/base-options): Adds a few options methods to base-methods, like `option`, `enable` and `disable`. See the readme… [more](https://www.npmjs.com/package/base-options) | [homepage](https://github.com/jonschlinkert/base-options)
* [base-pipeline](https://www.npmjs.com/package/base-pipeline): base-methods plugin that adds pipeline and plugin methods for dynamically composing streaming plugin pipelines. | [homepage](https://github.com/jonschlinkert/base-pipeline)
* [base-plugins](https://www.npmjs.com/package/base-plugins): Upgrade's plugin support in base-methods to allow plugins to be called any time after init. | [homepage](https://github.com/jonschlinkert/base-plugins)
* [base-tasks](https://www.npmjs.com/package/base-tasks): base-methods plugin that provides a very thin wrapper around [https://github.com/jonschlinkert/composer](https://github.com/jonschlinkert/composer) for adding task methods to… [more](https://www.npmjs.com/package/base-tasks) | [homepage](https://github.com/jonschlinkert/base-tasks)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/base-debug/issues/new).

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the MIT license.

***

_This file was generated by [verb](https://github.com/verbose/verb) on January 23, 2016._