const path = require( 'path' ),
    webpack = require( 'webpack' ),
    nodeEnv = process.env.NODE_ENV || 'production'

module.exports = {
    entry:  {
        filename: './src/index.js'
    },
    output: {
        filename: 'script.js',
        path:     path.resolve( __dirname, 'dist' )
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './',
        port: 9000
    },
    module:  {
        loaders: [
            {
                test:    /\.js$/,
                exclude: /node_modules/,
                loader:  'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify( nodeEnv ) }
        })
    ]
}
