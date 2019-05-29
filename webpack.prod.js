import merge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';

import { ui, main } from './webpack.common.js';


const prodConfig = {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false
        }
      })
    ]
  }
};

const prodUiConfig = merge(ui, prodConfig);
const prodMainConfig = merge(main, prodConfig);

export default [prodUiConfig, prodMainConfig];
