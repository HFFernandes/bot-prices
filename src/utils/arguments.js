
const commander = require('commander');

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-p, --pairs <value...>', 'currency pairs')
  .option('-o, --percent <value>', 'oscillation percentage', 0)
  .option('-i, --interval <value>', 'fetch interval', 5000)  
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
