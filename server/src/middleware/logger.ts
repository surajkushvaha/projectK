import * as moment from 'moment';
import * as fs from 'fs';
import * as path from 'path';
import { APP_CONSTANTS } from 'src/constants/app.constants';

function getCallerName() {
  const error = new Error();
  const stackLines = error.stack?.split('\n') || [];
  // The third line in the stack trace should be the caller of the logger function
  const callerLine = stackLines[4]?.trim();
  if (!callerLine) return 'Unknown';
  // Extract the function name from the caller line
  const matches = callerLine.match(/at\s+(.*?)\s+\(/);
  if (matches && matches.length >= 2) {
    // console.log(matches?.input?.split(' '));
    return `${callerLine}`;
  }
  return 'Unknown';
}

// Function to find the project root by looking for package.json
function findProjectRoot() {
  let currentDir = __dirname;
  while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
    currentDir = path.resolve(currentDir, '..');
  }
  return currentDir;
}

const projectRoot = findProjectRoot();
const logDirectory = path.join(projectRoot, 'logs');
const filename = moment().format('DD-MM-YYYY').toString() + '.log';
const logFile = path.join(logDirectory, filename);

// Ensure the log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Function to create or open the log file
function createLogFile() {
  return fs.createWriteStream(logFile, { flags: 'a' });
}

let log_file = createLogFile();

const Labels: any = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  success: 'success',
  notify: 'notify',
  alert: 'alert',
  normalize: 'normalize',
};

const fgColors: any = {
  error: APP_CONSTANTS.CONSOLE_COLORS.FgRed,
  warn: APP_CONSTANTS.CONSOLE_COLORS.FgMagenta,
  info: APP_CONSTANTS.CONSOLE_COLORS.FgBlue,
  success: APP_CONSTANTS.CONSOLE_COLORS.FgGreen,
  notify: APP_CONSTANTS.CONSOLE_COLORS.FgCyan,
  alert: APP_CONSTANTS.CONSOLE_COLORS.FgYellow,
  normalize: APP_CONSTANTS.CONSOLE_COLORS.FgWhite,
};

const bgColors: any = {
  error: APP_CONSTANTS.CONSOLE_COLORS.BgRed,
  warn: APP_CONSTANTS.CONSOLE_COLORS.BgMagenta,
  info: APP_CONSTANTS.CONSOLE_COLORS.BgBlue,
  success: APP_CONSTANTS.CONSOLE_COLORS.BgGreen,
  notify: APP_CONSTANTS.CONSOLE_COLORS.BgCyan,
  alert: APP_CONSTANTS.CONSOLE_COLORS.BgYellow,
  normalize: APP_CONSTANTS.CONSOLE_COLORS.BgWhite,
};

function logging(label: string, message: any) {
  const functionName = getCallerName();
  console.log(
    fgColors[label],
    `[${moment().format()}] [${label}] [Function ${functionName}] :`,
    message,
  );
  if (typeof message === 'object') {
    message = JSON.stringify(message);
  }
  const formattedMessage = `${moment().format()} [${label}] [Function ${functionName}] : ${message}\n`;
  log_file.write(formattedMessage);
}

export const logger = {
  error: (message: any) => logging(Labels.error, message),
  warn: (message: any) => logging(Labels.warn, message),
  info: (message: any) => logging(Labels.info, message),
  success: (message: any) => logging(Labels.success, message),
  notify: (message: any) => logging(Labels.notify, message),
  alert: (message: any) => logging(Labels.alert, message),
  normalize: (message: any) => logging(Labels.normalize, message),
};

// Log rotation logic
const logRotationInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function rotateLogFile() {
  log_file.end(); // Close the current log file stream
  fs.unlink(logFile, (err) => {
    if (err) {
      console.error(bgColors.error, 'Error deleting log file:', err);
    } else {
      log_file = createLogFile(); // Create a new log file
      console.log(bgColors.info, 'Log file rotated successfully.');
    }
  });
}

// Schedule log rotation
setInterval(rotateLogFile, logRotationInterval);
