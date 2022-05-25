import chalk from 'chalk';
import fs from 'fs';
//import gitignore from 'gitignore';
import ncp from 'ncp';
import path from 'path';
//import license from 'spdx-license-list/licenses/MIT';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
    clobber: true,         //set to false to avoide overriding if the files exist
    });
}

async function initGit(options) {
    const result = await execa('git', ['init'], {
      cwd: options.targetDirectory,
    });
    if (result.failed) {
      return Promise.reject(new Error('Failed to initialize git'));
    }
    return;
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

    const tasks = new Listr([
        {
          title: 'Copy project files',
          task: () => copyTemplateFiles(options),
        },
        {
          title: 'Initialize git',
          task: () => initGit(options),
          enabled: () => options.techs.includes('git')
        },
        {
          title: 'Install dependencies',
          task: () =>
            projectInstall({
              cwd: options.targetDirectory,
            })
        }
      ]);
     
    await tasks.run();

    // await copyTemplateFiles(options)
    console.log('%s Project created successfully!', chalk.green.bold('DONE'));
    return true;
}
