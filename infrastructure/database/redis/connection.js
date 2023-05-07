export default function connection(redis, config) {
    const createRedisClient = () => {
        return redis.createClient(config.redis.uri)
    }

    createRedisClient().on('connect', () => {
        console.log('redis connected')
    })

    createRedisClient().on('error', (err) => {
        console.error(`connect redis error ${err}`)
    })

    return {
        createRedisClient
    }
}