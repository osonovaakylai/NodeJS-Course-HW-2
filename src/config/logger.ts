import winston from 'winston';

const dateFormat = () => new Date(Date.now()).toUTCString();

class LoggerService {
  private log_data: any;
  private route: any;
  private logger: any;

  constructor(route: any) {
    this.log_data = null;
    this.route = route;
    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `./logs/${route}.log`,
        }),
      ],
      format: winston.format.printf((info) => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${
          info.message
        } | `;
        message = info.obj
          ? message + `data:${JSON.stringify(info.obj)} | `
          : message;
        message = this.log_data
          ? message + `log_data:${JSON.stringify(this.log_data)} | `
          : message;
        return message;
      }),
    });
    this.logger = logger;
  }
  setLogData(log_data: any) {
    this.log_data = log_data;
  }
  async info(message: string, obj?: any) {
    this.logger.log(
      'info',
      message,
      obj && {
        obj,
      }
    );
  }
  async debug(message: string, obj?: any) {
    this.logger.log(
      'debug',
      message,
      obj && {
        obj,
      }
    );
  }
  async error(message: string, obj?: any) {
    this.logger.log(
      'error',
      message,
      obj && {
        obj,
      }
    );
  }
}
export default LoggerService;
