import fs from 'fs'
import { parse } from 'csv-parse'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = join(dirname(__filename), 'server')

const planets: any = []

function isHabitablePlanet(planet: any) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  )
}
/* async function savePlanet(planet: any) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    )
  } catch (err) {
    console.error(`Could not save planet ${err}`)
  }
} */

/* async function getAllPlanets() {
  return await planets.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  )
} */

function loadPlanetsData() {
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          planets.push(data)
        }
      })
      .on('error', (err) => {
        console.log(err)
        reject(err)
      })
      .on('end', async () => {
        // const countPlanetsFound = (await getAllPlanets()).length
        console.log(`${planets.length} habitable planets found!`)
        resolve()
      })
  })
}

export { loadPlanetsData, planets }
