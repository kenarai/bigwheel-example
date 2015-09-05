var fs = require( 'fs' );
var select = require('dom-select');
var remove = require('remove-element');
var HBSPlugin = require('../../com/plugins/HBSPlugin');


var LandingPage = {
  init: function(req, done){
    var data = {
      icon: fs.readFileSync('app/assets/circle.svg','utf8'),
      copy: 'Bigwheel is an unopinionated, minimalist framework which handles frontend application state.<br> It can be used to organize your application into "sections"/pages which are brought in by routes.'
    };
    this.dom = HBSPlugin(fs.readFileSync('app/sections/landing/index.hbs','utf8'), data);

    done();
  },
  resize: function(width, height) {},
  animateIn: function(req, done) {done();},
  animateOut: function(req, done) {done();},
  destroy: function(req, done) {
    remove(this.dom);
    done();
  }
};

module.exports = LandingPage;
