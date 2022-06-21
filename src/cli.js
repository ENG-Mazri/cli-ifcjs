import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './utils';
import { style, scripts } from './style';
import { createSpinner } from 'nanospinner'


function parseArgumentsIntoOptions(rawArgs){
    const args = arg({
        // Types
        '--yes': Boolean,
        '--help': Boolean,
        '--version': Boolean,   
        // Aliases
        '-y':'--yes',
        '-h':'--help'
    },
    {    
        argv: rawArgs.slice(2)
    });
    return {
        skipPrompts: args['--yes'] || false,
        template: args._[0],
        showHelp: args['--help'] || false,
    }
}
async function promptFromMissingOptions(options){
   
    // IF the user skips the questions 
    const defaultTemplate = 'javascript';
    if (options.skipPrompts){

        return {
            ...options,
            template: options.template || defaultTemplate,
        };
    }

    //IF the user wants to build his template
    const questions = [];
    if(!options.template){
        questions.push({
            type: 'list',
            name: 'template',
            message: ' Please select a project template to use',
            choices: ['Javascript + Rollup','Javascript + Webpack' ],
            default: defaultTemplate 
        })
        questions.push({
            type: 'checkbox',
            name: 'techs',
            message: ' Please select technologies to add to your project',
            choices: ['git'],
            default: defaultTemplate 
        })

    }
    const answers = await inquirer.prompt(questions);
    return{
        ...options,
        template: options.template || answers.template,
        techs: options.techs || answers.techs
    }
}

export async function cli(args){
    // const spinner = createSpinner()
    // spinner.start()
    // setTimeout(()=>spinner.reset(), 2000)

    style()
    let options = parseArgumentsIntoOptions(args);
    
    if(options.showHelp){
        console.log('Contact us on eng.mazri@gmail.com')       
    }else{
        options = await promptFromMissingOptions(options);
        await createProject(options);
        scripts()
    }
}
