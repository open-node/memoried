## memoried ![npm](https://badge.fury.io/js/memoried.png)

js memory cache, support function (async or sync), object, string base on javascript memory variable, It work browser and node.js platform.

### Installation
````
$ [sudo] npm install memoried
````


### Example
````javascript
var memoried = require('memoried');
````

### API

## memoried

<pre>
var memoried = require('memoried');
memoried(key, value, life, opts);

// case1 get reture from memory-cache
// only one argument key, key must be a string
// return null when cache noexists
var res = memoried(key);

// case2 set a value(string, number, object or array) in memory-cache
// value is not function
// life is a seconds, cache expired = Date.now() + life * 1000
memoried(key, value, 1800);

// case3 memoried one function
// values is a function
// life is a seconds, This is expired who memoried function exec return
// opts optinal
// opts.bind function exec bind
// opts.sync sync or async default async
// when async callback must be
// function(error, result) {}
// return memoried function
memoriedFn = memoried('key{0}-{1}', function(a, b) {
  // do some things
  return Date.now();
}, 1800, {sync: true});

// each time same result
// because fn return has been cached
memoriedFn(1, 2);
memoriedFn(1, 2);
memoriedFn(1, 2);

//async function memoried
func = function(a, b, callback) {
  doSomeThing(function() {
    callback(error, result);
  });
};

memoriedFn = memoried('func-key{0}-{1}', func, 1800, {sync: false, bind: this});

// each time same result
// because fn return has been cached
memoriedFn(1, 3, function(error, result) {
  console.log(result);
});
memoriedFn(1, 3, function(error, result) {
  console.log(result);
});
memoriedFn(1, 3, function(error, result) {
  console.log(result);
});

</pre>


### MIT license
Copyright (c) 2014 13740080@qq.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
![docor](https://cdn1.iconfinder.com/data/icons/windows8_icons_iconpharm/26/doctor.png)
built upon love by [docor](https://github.com/turingou/docor.git) v0.1.3
