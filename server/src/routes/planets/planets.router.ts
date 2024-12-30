import { FastifyInstance } from 'fastify'
import { getAllPlanets } from './planets.controller'
export default async function planets(fastify: FastifyInstance) {
  const opts = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              kepid: {
                type: 'string',
              },
              kepoi_name: {
                type: 'string',
              },
              kepler_name: {
                type: 'string',
              },
              koi_disposition: {
                type: 'string',
              },
              koi_pdisposition: {
                type: 'string',
              },
              koi_score: {
                type: 'string',
              },
              koi_fpflag_nt: {
                type: 'string',
              },
              koi_fpflag_ss: {
                type: 'string',
              },
              koi_fpflag_co: {
                type: 'string',
              },
              koi_fpflag_ec: {
                type: 'string',
              },
              koi_period: {
                type: 'string',
              },
              koi_period_err1: {
                type: 'string',
              },
              koi_period_err2: {
                type: 'string',
              },
              koi_time0bk: {
                type: 'string',
              },
              koi_time0bk_err1: {
                type: 'string',
              },
              koi_time0bk_err2: {
                type: 'string',
              },
              koi_impact: {
                type: 'string',
              },
              koi_impact_err1: {
                type: 'string',
              },
              koi_impact_err2: {
                type: 'string',
              },
              koi_duration: {
                type: 'string',
              },
              koi_duration_err1: {
                type: 'string',
              },
              koi_duration_err2: {
                type: 'string',
              },
              koi_depth: {
                type: 'string',
              },
              koi_depth_err1: {
                type: 'string',
              },
              koi_depth_err2: {
                type: 'string',
              },
              koi_prad: {
                type: 'string',
              },
              koi_prad_err1: {
                type: 'string',
              },
              koi_prad_err2: {
                type: 'string',
              },
              koi_teq: {
                type: 'string',
              },
              koi_teq_err1: {
                type: 'string',
              },
              koi_teq_err2: {
                type: 'string',
              },
              koi_insol: {
                type: 'string',
              },
              koi_insol_err1: {
                type: 'string',
              },
              koi_insol_err2: {
                type: 'string',
              },
              koi_model_snr: {
                type: 'string',
              },
              koi_tce_plnt_num: {
                type: 'string',
              },
              koi_tce_delivname: {
                type: 'string',
              },
              koi_steff: {
                type: 'string',
              },
              koi_steff_err1: {
                type: 'string',
              },
              koi_steff_err2: {
                type: 'string',
              },
              koi_slogg: {
                type: 'string',
              },
              koi_slogg_err1: {
                type: 'string',
              },
              koi_slogg_err2: {
                type: 'string',
              },
              koi_srad: {
                type: 'string',
              },
              koi_srad_err1: {
                type: 'string',
              },
              koi_srad_err2: {
                type: 'string',
              },
              ra: {
                type: 'string',
              },
              dec: {
                type: 'string',
              },
              koi_kepmag: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  }
  fastify.get('/planets', opts, getAllPlanets)
}
