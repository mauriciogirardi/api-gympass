import { app } from './app'
import { env } from './env'
const { HOST, PORT } = env

app
  .listen({ port: PORT, host: HOST })
  .then(() => console.log('Server is running!!'))
  .catch((error) => console.error(error))
