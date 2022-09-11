#!/usr/bin/env node

/* Importing the modules. */
import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

/* Declaring a variable. */
let playerName;

/**
 * Sleep is a function that returns a promise that resolves after a given number of milliseconds.
 * @param [ms=2000] - The number of milliseconds to wait before resolving the promise.
 */
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

/**
 * It's a function that returns a promise that resolves after a certain amount of time.
 */
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who wants to be a JavaScript Millioaire? \n'
    )

    await sleep()

    rainbowTitle.stop()

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY!')}
        I am a process on your computer.
        If you get any question wrong I will be ${chalk.bgRed('killed')}
        So get all questions right...
    `)
}

/* It's calling the `welcome()` function, and then waiting for it to finish before continuing. */
await welcome()

/**
 * It asks the user for their name, and then sets the variable playerName to the answer.
 * @returns The player's name
 */
async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player'
        }
    })

    playerName = answers.player_name;
}

/* It's calling the `askName()` function, and then waiting for it to finish before continuing. */
await askName()

/**
 * The function is called question1, it's an async function, it uses the inquirer package to ask a
 * question, it returns the result of the handleAnswer function, which is passed a boolean value.
 * 
 * The handleAnswer function is defined as follows:
 * 
 * function handleAnswer(isCorrect) {
 *     if (isCorrect) {
 *         console.log('Correct!')
 *     } else {
 *         console.log('Incorrect!')
 *     }
 * }
 */
async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'JavaScript was created in 10 days then released on\n',
        choices: [
            'May 23rd, 1995',
            'Nov 24th, 1995',
            'Dec 4th, 1995',
            'Dec 17, 1996',
        ],
    })

    return handleAnswer(answers.question_1 === 'Dec 4th, 1995');
}

/* It's calling the `question1()` function, and then waiting for it to finish before continuing. */
await question1()

/**
 * It asks the user a question, and if the user answers correctly, it returns true. Otherwise, it
 * returns false.
 */
async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'What is x? var x = 1_1 + "1" + Number(1)\n',
        choices: ['4', '"4"', '"1111"', '69420'],
    })

    return handleAnswer(answers.question_2 === '1111')
}

/* It's calling the `question2()` function, and then waiting for it to finish before continuing. */
await question2()

/**
 * The function asks the user a question, and if the user's answer is correct, it returns true.
 * Otherwise, it returns false.
 */
async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: `What is the first element in the array? ['🐏', '🦙', '🐍'].length = 0\n`,
        choices: ['0', '🐏', '🐍', 'undefined'],
    })

    return handleAnswer(answers.question_3 === 'undefined')
}

/* It's calling the `question3` function, and then waiting for it to finish before continuing. */
await question3()

/**
 * It asks the user a question, and returns a boolean value based on whether or not the user answered
 * correctly.
 * @returns true or false
 */
async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'Which of the following is NOT a primitive type?\n',
        choices: [
            'boolean',
            'number',
            'null',
            'object'
        ]
    })

    return handleAnswer(answers.question_4 === 'object')
}

/* It's calling the `question4()` function, and then waiting for it to finish before continuing. */
await question4()

/**
 * It asks the user a question, and returns a boolean value based on the answer.
 */
async function question5() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message:
            'JS is a high-level single-threaded, garbage-collected,\n' +
            'interpreted(or just-in-time compiled), prototype-based,\n' +
            'multi-paradigm, dynamic language with a ____ event loop\n',
        choices: [
            'multi-threaded',
            'non-blocking', 
            'synchronos',
            'promise-based'
        ]
    })

    return handleAnswer(answers.question_5 === 'non-blocking')
}

/* It's calling the `question5()` function, and then waiting for it to finish before continuing. */
question5()

/**
 * The function takes a boolean value as an argument and returns a promise.
 * @param isCorrect - A boolean value that indicates whether the player's answer was correct.
 */
async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking Your Answer....').start()
    await sleep()

    if (isCorrect) {
        spinner.success({
            text: `Nice work ${playerName}. This is correct Answer.`
        })
    } else {
        spinner.error({
            text: `Game Over, you lose ${playerName}!`
        })
        process.exit(1)
    }
}

/**
 * It takes a string, and then prints it out in a big font.
 * 
 * The function is called `winner()` because it's going to be used to congratulate the player when they
 * win the game.
 * 
 * The first line of the function is a comment. It's a reminder to myself that this function is going
 * to be used to congratulate the player when they win the game.
 * 
 * The second line is a call to the `console.clear()` function. This function clears the console. It's
 * used here to make sure that the congratulations message is the only thing that's printed to the
 * console.
 * 
 * The third line is a variable declaration. The variable is called `msg`. It's a string that contains
 * the message that will be printed to the console.
 * 
 * The fourth line is a call to the `figlet` function. This function takes two arguments: a string, and
 * a callback
 */
function winner() {
    console.clear()

    const msg = `Congrats, ${playerName}!\n Here's your reward of 1,000,000$`

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data))
    })
}

/* It's printing a message to the console. */
winner()