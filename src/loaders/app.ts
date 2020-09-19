import express from 'express';
import swaggerUi from 'swagger-ui-express';
import Router from '../api/router';
import db from './db';
import * as swaggerDocument from '../config/swagger.json';

class App {
  private httpServer: any;
  private db: any;

  constructor() {
    this.httpServer = express();
    this.httpServer.use(express.json());
    this.db = db;

    new Router(this.httpServer);

    this.httpServer.use(
      '/swagger',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  public Start = (port: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.httpServer.listen(port, () => {
          resolve(port);
        })
        .on('error', (err: any) => reject(err));
    });
  };
}

export default App;
