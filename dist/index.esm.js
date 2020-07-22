import { Transformer } from '@parcel/plugin';

var index = new Transformer({
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

export default index;
//# sourceMappingURL=index.esm.js.map
