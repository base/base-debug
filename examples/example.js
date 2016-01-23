'use strict';

var debug = require('..');
var Base = require('base');
var base = new Base();

base.use(debug('foo'));

var one = base.debug('one');
var two = base.debug('two');

one('this is one!');
two('this is two!');
