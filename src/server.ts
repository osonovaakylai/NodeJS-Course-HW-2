import app from './loaders/app';
import config from './config/index';

const port = parseInt(config.port);

const server = new app()
  .Start(port)
  .then((runningPort: number) => console.log(`Server running on port ${runningPort}`))
  .catch((error: any) => {
    console.log(error);
    process.exit(1);
  });

export default server;
