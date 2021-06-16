module.exports = {
  context: __dirname,
  entry: {
    'kalman': './kalman',
  },
  output: {
    path: __dirname + '/dist-web',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader", 
        query:{
          presets: ['env']
        }
      }
    ]
  }
};