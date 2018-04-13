const path = require('path');
const fableUtils = require('fable-utils');

const name = 'fantasy';
const resolve = (relativePath) => path.join(__dirname, relativePath);


const fableOptions = {
    fableCore: __dirname + "/lib/fable-repl/fable-core",
    define: [
        "FX_NO_CORHOST_SIGNER",
        "FX_NO_LINKEDRESOURCES",
        "FX_NO_PDB_READER",
        "FX_NO_PDB_WRITER",
        "FX_NO_WEAKTABLE",
        "FX_REDUCED_EXCEPTIONS",
        "NO_COMPILER_BACKEND",
        "NO_EXTENSIONTYPING",
        "NO_INLINE_IL_PARSER"
    ],
};

const babelOptions = fableUtils.resolveBabelOptions({
    plugins: [
        ["transform-es2015-modules-commonjs"],
    ],
});

const babelOptions2 = fableUtils.resolveBabelOptions({
    presets: [
        ['env', {
            modules: 'commonjs'
        }]
    ],
    sourceMaps: true,
});


module.exports = {
    name: name,
    entry: resolve(`./src/${name}.fsproj`),
    outDir: resolve(`./dist`),
    babel: babelOptions,
    fable: fableOptions
};