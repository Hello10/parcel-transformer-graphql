(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@parcel/plugin')) :
  typeof define === 'function' && define.amd ? define(['@parcel/plugin'], factory) :
  (global = global || self, global.parcelTransformerGraphql = factory(global.plugin));
}(this, (function (plugin) {
  var index = new plugin.Transformer({
    transform: function ({
      asset,
      options
    }) {
      try {
        return Promise.resolve(options.packageManager.require('graphql-tag', asset.filePath, {
          autoinstall: options.autoinstall
        })).then(function (gql) {
          asset.type = 'js';
          return Promise.resolve(asset.getCode()).then(function (code) {
            const schema = gql(code);
            asset.setCode(`module.exports = ${JSON.stringify(schema, null, 2)};`);
            return [asset];
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }
  });

  return index;

})));
//# sourceMappingURL=index.umd.js.map
