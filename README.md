## Will Cook, August 2018

### Notes
**To run this application:**
You must have node installed. if you do not then I suggest following the instructions [here:](https://github.com/creationix/nvm).

**Pull this repo from Github or download the .zip file.**

**Install the packages:**
*either* 
run `yarn` from the terminal *or* if your not using yarn use npm with `npm install`.

**Run the application** with `yarn start` (or if not using yarn `node index.js`) from the top level of the project folder.

The application will run with the sample data. The logged output in the terminal will be the application output. There is no need to quit, the application does this when it is done.

### File structure

- .git ===> needed for git tracking
- node_modules ===> stores the packages used
- index.js ===> the main javascript application file
- instructions ===> markdown file of the developer problem
- notepad ===> a place for testing in isoloation away from the index.js file.
- package.json ===> the package index file
- README.md ===> this file
- yarn.lock ===> used by yarn

### Todo's
**Things I thought of but I havn't had time to implement, in no particular order**

- Adding a simple CLI UI to take a users input for robot control instructions. Use something like [inquirer.js](https://github.com/SBoudrias/Inquirer.js/)
- Add tests to ensure that the functions ( *_parseNewDirection*, *_updateLocation*, *_checkIfOffGrid*) return as expected. [Jest](https://jestjs.io) would be good for this.
- Move the sample data into a file on it's own.
- Move the functions into a file each.
- Handle egde cases, e.g lowercase position or instruction.
- Handle the maximum value for any coordinate, 50.
- Ensure all instruction strings will be less than 100 characters in length.
- Add color to the output. Something like [chalk](https://github.com/chalk/chalk).

