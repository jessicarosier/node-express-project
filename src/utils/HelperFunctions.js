const logger = require('../utils/logger');
const { spawn } = require('child_process');

class HelperFunctions {

    static async executePythonScript(scriptPath, args) {
        const python = spawn('python3', [scriptPath, ...args]);
        let output;

        python.stdout.on('data', (data) => {
            output = data.toString();
            logger.info(`stdout: ${data}`);
        });

        python.stderr.on('data', (data) => {
            output = data.toString();
            logger.error(`stderr: ${data}`);
        });

        python.on('close', (code) => {
            logger.info(`child process exited with code ${code}`);
        });

        return output;
    }

}

module.exports = HelperFunctions;

