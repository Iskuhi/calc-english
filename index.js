//colors must be required use .yellow, .bold, etc. on strings
require('colors');
 
//Dependencies
var words = require('in-words').en;
var calc = require('training-calculator');
 
//If this was called directory, calculate the result
if(require.main === module){
    var args = process.argv.slice(2);
    var result = calcEnglish(args);
 
 
    //Output our version of calculator to demonstrate how version ranges work
    //Output the result
    console.log(version());
    console.log('Your result is: ' + result.green.bold);
}
 
 
//Helper functions
function version(){
    return 'Using version '.gray +
        require('training-calculator/package').version.yellow +
        ' of the calculator.'.gray;
}
 
function calcEnglish(){
    var result = calc.apply(null, arguments);
    return words(result);
}
 
module.exports = calcEnglish;