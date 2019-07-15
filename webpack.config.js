const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputDir = path.resolve(__dirname, './build')

/**
 * Modules to be exported
 */
module.exports = [
    {
        entry: {
            util: './src/tiler.ts',
            test: './src/test.ts'
        },
        output: {
            path: outputDir,
            filename: '[name].js'
        },
        resolve: {
            extensions: ['.ts']
        },
        mode: 'development',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loaders: ["ts-loader"],
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: './html/*', flatten: true },
                { from: './favicon.ico'},
                { from: './app.json' }
            ])
        ]
    }
];

