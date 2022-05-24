
const commander = require('commander');

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-p, --pairs <value...>', 'Currency pairs')
  .option('-o, --percent <value>', 'Oscillation percentage..')
  .option('-i, --interval <value>', 'Fetch interval')  
  .parse(process.argv);

const options = commander.opts();

const pairs = options.pairs;
const percent = options.percent;
const interval = options.interval;

var data = []
pairs.forEach(element => {
    if (element.includes(':')) {
        const rateLimit = element.split(":");
        const ob = { "pair": rateLimit[0], "percent": rateLimit[1] }
        data.push(ob)
    } else {
        const ob = { "pair": element, "percent": percent }
        data.push(ob)
    }
});

module.exports = {
  data,
  percent,
  interval,
}
