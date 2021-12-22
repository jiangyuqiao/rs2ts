const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  // mode: "production",
  // context: __dirname, // to automatically find tsconfig.json
  entry: './src/index.ts',
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".wasm"],
    alias: {
      // 'code-block-writer': path.resolve(__dirname, 'node_modules/.pnpm/node_modules/code-block-writer/esm/mod.js') // for ts-morph
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.wasm$/,
        // type: 'webassembly/sync',
        type: 'webassembly/async',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
  devtool: 'source-map',
  experiments: {
    asyncWebAssembly: true
    // importAsync: true
    // syncWebAssembly: true
  }
};
