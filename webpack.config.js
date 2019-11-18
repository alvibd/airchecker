module.exports = options => {
    return {
      entry: './index.js',
      output: {
        filename: 'bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                },
              },
            ],
          },
        ],
      },
    }
  }