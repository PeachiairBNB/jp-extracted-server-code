
// const path = require('path');
// // // Build directory is where the bundle file will be placed
//  var BUILD_DIR = path.resolve(__dirname, 'client/dist');
// // // App directory is where all of your raw JSX files will be placed
//  var APP_DIR = path.resolve(__dirname, 'client/src');


// module.exports = {
//   entry: {
//     app: APP_DIR + '/index.jsx'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'client/dist')
//   },

//   module: {
//     rules: [{
//       test: /\.jsx$/, // include .jsx files
//       enforce: "pre", // preload the jshint loader
//       exclude: /node_modules/, // exclude any and all files in the node_modules folder
//       use: [{
//         loader: 'babel-loader',
//         options: {  // ⬅ formally jshint property
//           camelcase: true,
//           emitErrors: false,
//           failOnHint: false
//         }
//       }]
//     }]
//   },
// };




var webpack = require('webpack');
var path = require('path');
module.exports = {
       entry: __dirname + '/client/src/index.jsx',
       module: {
         rules: [
           {
             test: /\.s?css$/,
             use: ['style-loader', 'css-loader'],
           },
           {
             test: /\.svg$/,
             use: [
               {
                 loader: 'babel-loader',
                 query: {
                   presets: ['airbnb'],
                 },
               },
             ],
           },
           {
             test: /\.jsx$/,
             use: [
               {
                 loader: 'babel-loader',
                 query: {
                   presets: ['airbnb'],
                 },
               },
             ],
           },
         ],
       },
       output: {
         filename: 'bundle.js',
         path: __dirname + '/client/dist'
       }
  };