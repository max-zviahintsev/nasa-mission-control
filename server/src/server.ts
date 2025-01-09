import app from './app.ts'
import mongoose from 'mongoose'
import { loadPlanetsData } from './models/planets.model.ts'

const uri =
  'mongodb+srv://max-horo:OcJunwRWQ58sEsYO@nasa-mc-cluster.yh885.mongodb.net/?retryWrites=true&w=majority&appName=nasa-mc-cluster'

const clientOptions: mongoose.ConnectOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
}
async function run() {
  try {
    await mongoose.connect(uri, clientOptions)
    await mongoose.connection.db?.admin().command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    await mongoose.disconnect()
  }
}
run().catch(console.dir)

await loadPlanetsData()
app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
