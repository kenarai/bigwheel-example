var hbs = require('handlebars');
var domify = require('domify');
var prepend = require('prepend-child');

var HBSPlugin = function(data,model,container) {
    var dom = domify(hbs.compile(data)(model));
    prepend((container) ? container : HBSPlugin.container,dom);
    return dom;
};
HBSPlugin.setPartial = function(name,template) {
    hbs.registerPartial(name,template);
};
HBSPlugin.setHelper = function(name,fn) {
    hbs.registerHelper(name,fn);
};
HBSPlugin.setup = function(container) {
    this.container = container;
};

module.exports = HBSPlugin;
