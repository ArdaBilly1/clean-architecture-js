export default {
    port: process.env.PORT,
    ip:   process.env.HOST,
    mongo: {
        uri:  process.env.MONGO_URL
    },
    redis: {
        uri:  process.env.REDIS_URL
    },
    jwtSecret: process.env.JWT_KEY
}