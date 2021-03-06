import {Transformer} from '@parcel/plugin';

export default new Transformer({
  async transform({asset, options}) {
    const gql = await options.packageManager.require(
      'graphql-tag',
      asset.filePath,
      {autoinstall: options.autoinstall},
    );
    asset.type = 'js';
    const code = await asset.getCode();
    const schema = gql(code);
    asset.setCode(
      `module.exports = ${JSON.stringify(schema,null,2,)};`,
    );
    return [asset];
  },
});
