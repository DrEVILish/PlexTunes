import merge from 'webpack-merge';
import CleanTerminalPlugin from 'clean-terminal-webpack-plugin';

import { ui, main } from './webpack.common.js';

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new CleanTerminalPlugin(),
  ],
};

const devUiConfig = merge(ui, devConfig);
const devMainConfig = merge(main, devConfig);

export default [devUiConfig, devMainConfig];
