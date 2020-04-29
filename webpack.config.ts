import * as webpack from "webpack";
import * as path from 'path';

export const config: webpack.Configuration = {
  mode: 'production',
  entry: './src/client/index.ts',
  output: {},
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: 'svelte-loader'
      }
    ]
  }
}