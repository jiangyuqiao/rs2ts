const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new MonacoWebpackPlugin({
      features: ['!accessibilityHelp', '!colorPicker', '!snippet', '!codeAction', '!codelens', '!toggleHighContrast', '!toggleTabFocusMode'],
      languages: ['typescript', 'rust']
    })
  ],
  devtool: 'source-map',
  experiments: {
    asyncWebAssembly: true
    // importAsync: true
    // syncWebAssembly: true
  }
};
