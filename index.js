require('colors');

const { readInput, pause, inquirerMenu } = require('./helper/inquirer');

const main = async () => {

  let opt;

  do {
    console.clear();

    opt = await inquirerMenu();


    await pause();

  } while (opt !== 0);


};

main().then();
