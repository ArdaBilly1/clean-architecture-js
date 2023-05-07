import express from 'express'
import expressSetting from './infrastructure/webserver/express'
import serverConfig from './infrastructure/webserver/server'
import mongoDBConnection from './infrastructure/database/mongoDB/connection'
import redisConnection from './infrastructure/database/redis/connection'
import config from './config/config'
import mongoose from 'mongoose'
import redis from 'redis'
import routes from './gateway/routes'

const app = express()
const server = require('http').createServer(app)

expressSetting(app)

serverConfig(app, server, config)

mongoDBConnection(mongoose, config, {
    autoIndex: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 10000,
    keepAlive: 120,
    connectTimeoutMS: 1000
  }).connectToMongo()

const redisClient = redisConnection(redis,config)

routes(app, express, redisClient)

export default app
