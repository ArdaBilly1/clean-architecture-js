import injector from "./injector";

export default function routes(app, express, redisClient) {

    const userSvc = injector().userHandler
    app.use('/user', (express, redisClient) => {

    }); 
}