#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

// console.log(chalk.bgGreen('hi'))

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

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

await welcome()

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

await askName()

async function question1() {
    const answers = await inquirer.prompt({
        name: 'Question 1',
        type: 'list',
        message: 'JavaScript was created in 10 days then released on\n',
        choices: [
            'May 23rd, 1995',
            'Nov 24th, 1995',
            'Dec 4th, 1995',
            'Dec 17, 1995'
        ]
    })

    return handleAnswer(answers.question_1 == 'Dec 4th, 1995')
}

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

await question1()

function winner() {
    console.clear()

    const msg = `Congrats, ${playerName}!\n Here's your reward of 1,000,000$`

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data))
    })
}

winner()