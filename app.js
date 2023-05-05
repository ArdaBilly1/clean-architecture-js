import express from 'express'
import expressSetting from './infrastructure/webserver/express'
import serverConfig from './infrastructure/webserver/server'
import mongoDBConnection from './infrastructure/database/mongoDB/connection'
import config from './config/config'
import mongoose from 'mongoose'


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

export default app
