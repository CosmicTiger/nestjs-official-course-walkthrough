/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');

const command = process.argv.slice(2).join(' ');

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    console.error(`Standard Error: ${stderr}, Standard Output: ${stdout}`);
    process.exit(1); // Exit with failure
  }
  console.log(`Output: ${stdout}`);
  process.exit(0); // Exit with success
});
