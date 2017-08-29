const fs = require( 'fs' )
const Path = require( 'path' )
const promisify = require( './promisify')
const readFile = promisify( fs.readFile )
const {
  parseTxtIntoObject,
  calculateTrendByTwo,
  calulateResultsPerWindowSize,
  printWindowResultsByLine } = require('./increasingSubranges.js')

// MAIN
const findIncreasingSubranges = ( filepath ) => {
  readFile( Path.resolve( __dirname, filepath) )
    .then( parseTxtIntoObject )
    .then( calculateTrendByTwo )
    .then( calulateResultsPerWindowSize )
    .then( printWindowResultsByLine )
    .catch( error => console.error( 'ERROR', error ))
}

findIncreasingSubranges('input/input2.txt')
