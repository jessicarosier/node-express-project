const logger = require('../utils/logger');
const fs = require('fs');
const { spawn } = require('child_process');

class HelperFunctions {


static async executePythonScript(scriptPath, args)
{
    return new Promise((resolve, reject) => {
        const python = spawn('python3', [scriptPath, ...args]);
        let output = '';
        let errorOutput = '';

        python.stdout.on('data', (data) => {
            output += data.toString();
            logger.info(`Python stdout: ${data}`);
        });

        python.stderr.on('data', (data) => {
            errorOutput += data.toString();
            logger.error(`Python stderr: ${data}`);
        });

        python.on('close', (code) => {
            logger.info(`Python process exited with code ${code}`);
            if (code !== 0) {
                reject(new Error(`Python script exited with code ${code}. Error: ${errorOutput}`));
            } else {
                resolve(output);
            }
        });

        python.on('error', (err) => {
            logger.error(`Failed to start Python process: ${err}`);
            reject(err);
        });
    });

}


}

module.exports = HelperFunctions;

