import fs from 'fs'
import { parse } from 'csv-parse'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { PlanetInitial } from './types.ts'
import PlanetModel from './planets.mongo.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = join(dirname(__filename), 'server')

function isHabitablePlanet(planet: PlanetInitial) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    Number(planet['koi_insol']) > 0.36 &&
    Number(planet['koi_insol']) < 1.11 &&
    Number(planet['koi_prad']) < 1.6
  )
}
async function getAllPlanets() {
  return await PlanetModel.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  )
}
async function savePlanet(planet: PlanetInitial) {
  try {
    await PlanetModel.updateOne(
      {
        planetName: planet.kepler_name,
      },
      {
        planetName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    )
  } catch (err) {
    console.error(`Could not save planet ${err}`)
  }
}
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
          savePlanet(data)
        }
      })
      .on('error', (err) => {
        console.log(err)
        reject(err)
      })
      .on('end', async () => {
        const countPlanetsFound = (await getAllPlanets()).length
        console.log(`${countPlanetsFound} habitable planets found!`)
        resolve()
      })
  })
}

export { loadPlanetsData, getAllPlanets }
