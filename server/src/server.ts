import app from './app.ts'
import mongoose from 'mongoose'
import { loadPlanetsData } from './models/planets.model.ts'

const uri =
  'mongodb+srv://max-horo:OcJunwRWQ58sEsYO@nasa-mc-cluster.yh885.mongodb.net/nasa?retryWrites=true&w=majority&appName=nasa-mc-cluster'

const clientOptions: mongoose.ConnectOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
}
async function gracefulShutdown() {
  try {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error)
  }
  process.exit(0)
}
async function run() {
  try {
    await mongoose.connect(uri, clientOptions)
    await mongoose.connection.db?.admin().command({ ping: 1 })
    console.log('Connected to MongoDB')

    const exitEvents = [
      `exit`,
      `SIGINT`,
      `SIGTERM`,
      `SIGUSR1`,
      `SIGUSR2`,
      `uncaughtException`,
      `beforeExit`,
    ]
    exitEvents.forEach((event) => {
      process.on(event, gracefulShutdown)
    })
  } catch (err) {
    console.error(err)
  }
}
run()

await loadPlanetsData()
app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
