export default function connection(mongoose, config, options) {
    function connectToMongo() {
        mongoose
            .connect(config.mongo.uri, options)
            .then(
                () => { },
                (err) => {
                    console.log("mongoDb Error", err)
                }
            )
            .catch((err) => {
                console.log("ERROR:", err)
            })
    }

    mongoose.connection.on('connection', () => {
        console.info('Connected mongoDb')
    })

    mongoose.connection.on("reconnected", () => {
        console.info('reconnected!')
    })

    return {
        connectToMongo
    }
}