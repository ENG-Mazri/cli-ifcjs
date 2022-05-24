import chalk from 'chalk';
//import chalkAnimation from 'chalk-animation'

export function style(){
    //CLI Header
    console.log();
    console.log(chalk.blue.bgYellow.bold('  IFC.js CLI  ') + chalk.grey.italic('   v 1.0.0'));
    console.log();
    console.log(chalk.grey.italic('Generate an ifc.js web application template.'));
    //console.log(chalkAnimation.rainbow('Generate an ifc.js web application template.'));
    console.log();
    console.log();
}