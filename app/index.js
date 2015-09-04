'use strict';
var domready = require('detect-dom-ready');
var bigwheel = require('bigwheel');
var select = require('dom-select');
var HBSPlugin = require('./com/plugins/HBSPlugin');


var nav = require('./ui/nav');
var landing = require( './sections/landing/' );
var docs = require( './sections/docs/' );
var issues = require( './sections/issues/' );
// var notfound = require( './sections/notfound/' );

var app = function(){
  var framework = bigwheel( function(done) {
    done({
      routes: {
        '/': [ nav, landing ],
        '/docs': [ nav, docs ],
        '/issues': [ nav, issues ],
        // '/404': [ nav, notfound ]
      }
    });
  });

  HBSPlugin.setup(select('#container'));

  nav.setFramework(framework);
  framework.init();
}

domready(function() {
  new app();
});
