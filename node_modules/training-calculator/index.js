var _ = require('lodash');

var operations = {
    '+': _.memoize(function(a, b){
        return a + b;
    }, resolver),
    '-': _.memoize(function(a, b) {
        return a - b;
    }, resolver),
    '*': _.memoize(function(a, b){
        return a * b;
    }, resolver),
    '%': _.memoize(function(a, b){
        return a % b;
    }, resolver),
    '^': _.memoize(function(a, b){
        return Math.pow(a, b);
    }, resolver),
    '/': _.memoize(function(a, b){
        return Math.floor(a / b);
    }, resolver)
};

function resolver(){
    return Array.prototype.join.call(arguments, ':');
}

function flattenArray(arr){
    return arr.reduce(function(prev, curr){
        if(curr && curr instanceof Array){
            while(curr.length){
                prev.push(curr.shift());
            }

            return prev;
        }

        prev.push(curr);

        return prev;
    }, []);
}

module.exports = function calc(){
    var args = Array.prototype.slice.apply(arguments);
    args = flattenArray(args);

    return args.reduce(function(prev, curr){
        if(operations[curr] instanceof Function){
            return operations[curr].bind(null, prev);
        }

        if(prev instanceof Function){
            return prev(parseInt(curr, 10));
        }

        if(prev !== null){
            throw "Must provide operator";
        }

        return parseInt(curr, 10);
    }, null);
};
