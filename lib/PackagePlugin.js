'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function PackagePlugin(options) {}

PackagePlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', function (compilation) {
    console.log(compilation);
  });
};

exports.default = PackagePlugin;