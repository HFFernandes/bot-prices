const program = require("./utils/arguments")

console.log('pairs     : ' + program.options.pairs);
console.log('interval  : ' + program.options.interval);
console.log('percent   : ' + program.options.percent);

const percent = program.options.interval;
const pairs = program.options.pairs;
const timeout = program.options.interval;

var data = []
pairs.forEach(element => {
    if (element.includes(':')) {
        const rateLimit = element.split(":");
        const ob = { "pair": rateLimit[0], "percent": rateLimit[1] }
        data.push(ob)
    }else{
        const ob = { "pair": element, "percent": percent }
        data.push(ob)
    }
});

console.log(data)