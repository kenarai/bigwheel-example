var fs = require( 'fs' );
var select = require('dom-select');
var HBSPlugin = require('../../com/plugins/HBSPlugin');
var isInitialized = false;
var elementClass = require('element-class');

var UiNav = {
  init: function(req, done){
    if (!isInitialized) {
      isInitialized = true;
      var data = {
        links:[
          {title: 'Home', path: '/'},
          {title: 'Docs', path: '/docs'},
          {title: 'Issues', path: '/issues'}
        ]
      };
      this.dom = HBSPlugin(fs.readFileSync('app/ui/nav/index.hbs','utf8'), data);

      this.clickHandler = this.clickHandler.bind(this);

      this.menu = select('#main-nav');
      this.menuItems = select.all('.main-nav-link', this.dom);
      this.menuItems.forEach = Array.prototype.forEach;


      this.menuItems.forEach(function(element, index, array){
        element.addEventListener('click', this.clickHandler);
      }.bind(this));
    }

    this.menu.className = '';
    elementClass(this.menu).add(String(req.route).replace('/', ''));
    done();
  },

  clickHandler: function(e){
    e.preventDefault();
    var link = e.target.href.replace(window.location.origin, '');

    this.framework.go(link);
  },

  resize: function(width, height) {},
  animateIn: function(req, done) {done();},
  animateOut: function(req, done) {done();},
  destroy: function(req, done) {done();},

  setFramework: function(framework){
    this.framework = framework;
  }
};

module.exports = UiNav;
