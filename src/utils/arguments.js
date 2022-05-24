
const commander = require('commander');

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-p, --pairs <value...>', 'Currency pairs')
  .option('-o, --percent <value>', 'Oscillation percentage..')
  .option('-i, --interval <value>', 'Fetch interval')  
  .parse(process.argv);

const options = commander.opts();

module.exports = {
  options
}
