var assert = require('assert')
  , memoized = require('../');

describe('memoized', function() {
  describe('value is string type', function() {
    it("写入一个cache，可以正常获取", function(done) {
      ret = memoized('hello', 'hello', 1000);
      assert.equal(memoized('hello'), 'hello');
      done();
    });

    it("读取一个不存在的cache, 返回null", function(done) {
      assert.equal(null, memoized('world'));
      done();
    });

    it("过期的cache获取的时候返回null", function(done) {
      assert.equal(true, memoized('hello', 'world', 1));
      assert.equal('world', memoized('hello'));
      setTimeout(function() {
        assert.equal(null, memoized('hello'));
        done();
      }, 1001);
    });
  });

  describe('value is object get set', function() {
    var obj = {
      hello: 'world',
      now: new Date
    };
    it("set一个对象，可以正常获取这个对象", function(done) {
      assert.equal(true, memoized('hello', obj, 100));
      assert.equal(obj, memoized('hello'));
      done();
    });
  });

  describe('value is func get set', function() {
    var fn = function() {
        return Date.now();
      }
    , fnm = memoized('key', fn, 1800, {sync: true});
    it("memoized func, return other func, curry", function(done) {
        var res1 = fnm()
          , msg = 'Memoized func both exec result equal';
        setTimeout(function() {
          assert.equal(res1, fnm(), msg);
          done();
        }, 500);
    });

    it("memoized func, return other func, curry", function(done) {
      var res1 = fn()
        , msg = 'Unmemoized func both exec result not equal';
      setTimeout(function() {
        assert.notEqual(res1, fn(), msg);
        done();
      }, 800);
    });

  });
});
