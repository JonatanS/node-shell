var commands = require('./commands.js');

process.stdout.write('prompt > ');

process.stdin.on('data', function(data) {
  var cmd = data.toString().trim();
  var arguments = cmd.split(' ')[1];
  cmd = cmd.split(' ')[0];
  
//  if (cmd === 'pwd') commands.cwd(arguments);
//  if (cmd === 'date') commands.date(arguments);
//  if (cmd === 'ls') commands.ls(arguments);
//  if (cmd === 'echo') commands.echo(arguments);
  commands[cmd](arguments);
  
});