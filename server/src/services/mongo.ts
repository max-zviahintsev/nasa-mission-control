import mongoose from 'mongoose'

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
}

async function mongoConnect() {
  const { readyState, db } = mongoose.connection
  if (readyState) {
    return
  }

  try {
    await mongoose.connect(uri, clientOptions)
    await db?.admin().command({ ping: 1 })
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
mongoConnect()

export { mongoConnect, gracefulShutdown }
