import app from './app.ts'
import { loadPlanetsData } from './models/planets.model.ts'
import { mongoConnect } from './services/mongo.ts'
import { loadLaunches } from './models/launches.model.ts'

await loadPlanetsData()
await mongoConnect()
await loadLaunches()

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
