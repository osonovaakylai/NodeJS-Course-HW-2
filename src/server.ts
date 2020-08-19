import app from './app'

const port = parseInt(process.env.PORT) || 3000

const server = new app().Start(port)
  .then((port: number) => console.log(`Server running on port ${port}`))
  .catch((error: any) => {
    console.log(error)
    process.exit(1);
  });

export default server;