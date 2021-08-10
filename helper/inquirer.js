const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?\n',
    choices: [{
      value: 1,
      name: `${'1.'.green} Search city`
    },
      {
        value: 2,
        name: `${'2.'.green} History`
      },
      {
        value: 0,
        name: `${'0.'.green} Exit`
      }
    ]
  }
];


const inquirerMenu = async () => {
  console.clear();
  console.log('================================='.green);
  console.log('===== Select option ====='.white);
  console.log('=================================\n'.green);

  const { option } = await inquirer.prompt(questions);

  return option;
};

const pause = async () => {
  console.log('\n');
  await inquirer.prompt({
    type: 'input',
    name: 'input',
    message: `Press ${'ENTER'.green} for continue`
  });

};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please enter a option';
        }
        return true;
      }
    }
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;

};

const listPlaces = async (places = []) => {
  const choices = places.map((place, i) => {

    const idx = `${i + 1}.`.green;

    return {
      value: place.id,
      name: `${idx} ${place.name}`
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancel'
  });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Selection place:',
      choices
    }
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirm = async (message) => {

  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showChecklist = async (task = []) => {

  const choices = task.map((task, i) => {

    const idx = `${i + 1}.`.green;

    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: !!(task.dateComplete)
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selection',
      choices
    }
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listPlaces,
  showChecklist,
  confirm
};
