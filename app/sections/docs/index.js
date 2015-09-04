var fs = require( 'fs' );
var select = require('dom-select');
var remove = require('remove-element');
var HBSPlugin = require('../../com/plugins/HBSPlugin');


var DocsPage = {
  init: function(req, done){
    var data = {
      icon: fs.readFileSync('app/assets/docs.svg','utf8'),
      copy: 'Full Documentation lives here: <br> <a href="https://github.com/bigwheel-framework/documentation">https://github.com/bigwheel-framework/documentationdocs</a>'
    };
    this.dom = HBSPlugin(fs.readFileSync('app/sections/docs/index.hbs','utf8'), data);

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

module.exports = DocsPage;
