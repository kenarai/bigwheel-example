var fs = require( 'fs' );
var select = require('dom-select');
var remove = require('remove-element');
var HBSPlugin = require('../../com/plugins/HBSPlugin');
var animate = require( 'gsap-promise' );


var LandingPage = {
  init: function(req, done){
    var data = {
      icon: fs.readFileSync('app/assets/circle.svg','utf8'),
      copy: 'Bigwheel is an unopinionated, minimalist framework which handles frontend application state.<br> It can be used to organize your application into "sections"/pages which are brought in by routes.'
    };
    this.dom = HBSPlugin(fs.readFileSync('app/sections/landing/index.hbs','utf8'), data);
    this.icon = select('.icon', this.dom);
    this.copy = select('.copy', this.dom);

    done();
  },
  resize: function(width, height) {},
  animateIn: function(req, done) {
    var d = 1;
    var ease = Expo.easeOut;
    var animations = [
      animate.to(this.dom, d, {opacity: 1}),
      animate.fromTo(this.icon, d, {opacity: 0, y: 100 }, {opacity: 1, y: 0, delay: d, ease: ease}),
      animate.fromTo(this.copy, d, {opacity: 0, y: 100 }, {opacity: 1, y: 0, delay: d*1.2, ease: ease}),
    ];

    animate.all(animations)
    .then(done);
  },
  animateOut: function(req, done) {
    var d = 0.5;
    var ease = Expo.easeIn;
    var animations = [
      animate.to(this.dom, d, {opacity: 0, delay: d*1}),
      animate.to(this.icon, d, {opacity: 0, y: 100, delay: d*0.3, ease: ease}),
      animate.to(this.copy, d, {opacity: 0, y: 100, ease: ease}),
    ];

    animate.all(animations)
    .then(done);
  },
  destroy: function(req, done) {
    remove(this.dom);
    done();
  }
};

module.exports = LandingPage;
