'use strict';
var vows = require('vows');
var assert = require('assert');
var tough = require('../lib/cookie');

vows
  .describe('CookieJar')
  .addBatch({
    "Prototype pollution": {
      "set cookie with the domain __proto__": {
        topic: function() {
          const cookieJar = new tough.CookieJar(undefined, {
            rejectPublicSuffixes: false
          });
          // try to pollute the prototype
          cookieJar.setCookieSync(
            "Cookie=polluted; Domain=__proto__; Path=/test",
            "https://__proto__/admin"
          );
          cookieJar.setCookieSync(
            "Auth=cookie; Domain=example.com; Path=/test",
            "https://example.com/"
          );
          this.callback();
        },
        "cookie is affected by prototype pollution": function() {
          const pollutedObject = {};
          assert(pollutedObject["/test"] === undefined);
        }
      }
    }
  })
  .export(module);