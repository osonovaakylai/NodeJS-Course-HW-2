import app from './app';

const port = parseInt(process.env.PORT || '8080');

const server = new app()
  .Start(port)
  .then((runningPort: number) => console.log(`Server running on port ${runningPort}`))
  .catch((error: any) => {
    console.log(error);
    process.exit(1);
  });

export default server;
