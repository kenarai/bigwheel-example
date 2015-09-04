var fs = require( 'fs' );
var select = require('dom-select');
var remove = require('remove-element');
var HBSPlugin = require('../../com/plugins/HBSPlugin');


var IssuesPage = {
  init: function(req, done){
    var data = {
      icon: fs.readFileSync('app/assets/issues.svg','utf8'),
      copy: 'Log issues here: <br> <a href="https://github.com/bigwheel-framework/bigwheel/issues">https://github.com/bigwheel-framework/bigwheel/issues</a>'
    };
    this.dom = HBSPlugin(fs.readFileSync('app/sections/issues/index.hbs','utf8'), data);

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

module.exports = IssuesPage;
