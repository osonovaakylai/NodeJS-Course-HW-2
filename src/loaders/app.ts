import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import Router from '../api/router';
import db from './database';
import * as swaggerDocument from '../config/swagger.json';
import Logger from '../config/logger';
import config from '../config/index';

class App {
  public httpServer: any;
  public db: any;
  private logger: any;

  constructor() {
    this.httpServer = express();
    this.httpServer.use(express.json());
    this.db = db;
    this.logger = new Logger('app');

    new Router(this.httpServer);

    this.httpServer.use(cors(config.corsOptions));

    this.httpServer.use(
      '/swagger',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  public Start = (port: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.httpServer
        .listen(port, () => {
          resolve(port);
          this.logger.info(`Application launched in PORT  ${port}`);
        })
        .on('error', (err: any) => {
          this.logger.error('Something went wrong! ');
          console.error(err);
          reject(err);
        });
    });
  };
}

export default App;
