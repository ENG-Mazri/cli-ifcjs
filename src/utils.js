import chalk from 'chalk';
// import execa from 'execa';
import fs from 'fs';
//import gitignore from 'gitignore';
//import Listr from 'listr';
import ncp from 'ncp';
import path from 'path';
//import { projectInstall } from 'pkg-install';
//import license from 'spdx-license-list/licenses/MIT';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
    clobber: true,         //set to false to avoide overriding if the files exist
    });
}



export async function createProject(options) {
    options = {
    ...options,
    targetDirectory: process.cwd(),       // the directory of the user 
    };
    const templateDir = path.join(__dirname, '../templates',options.template.toLowerCase());
    options.templateDirectory = templateDir;

    try {
        await access(templateDir, fs.constants.R_OK);       //check if the file can be read by the calling process
    } catch (err) {
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    //console.log('Copy project files');
    await copyTemplateFiles(options);
    //console.log(options)
    console.log('%s Project created successfully!', chalk.green.bold('DONE'));
    return true;
}
