import app from './app.ts'
import { loadPlanetsData } from './models/planets.model.ts'

await loadPlanetsData()
app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
