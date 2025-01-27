import app from './app.ts'
import { loadPlanetsData } from './models/planets.model.ts'
import { mongoConnect } from './services/mongo.ts'
import { loadLaunches } from './models/launches.model.ts'

await loadPlanetsData()
await mongoConnect()
await loadLaunches()

const PORT = Number(process.env.PORT) || 8080
const HOST = '0.0.0.0'

app.listen({ port: PORT, host: HOST }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
