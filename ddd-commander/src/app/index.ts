import { Command } from 'commander';
const program = new Command();

//program.version('0.0.1', '-v, --vers', 'output the current version');

program
  .command('clone <source> [destination]')
  .description('clone a repository into a newly created directory')
  .action((source, destination) => {
    console.log('clone command called');
  })
  .parse();
