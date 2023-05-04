import compression from 'compression'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import morgan from 'morgan'

export default function expressSetting(app) {
    // security
    app.use(helmet())
    app.use(compression())
    app.use(bodyParser.json({limit: '50mb'}))
    app.use(
        bodyParser.urlencoded({
            limit:'50mb',
            extended:true,
            parameterLimit:50000
        })
    )

    // access origin
    app.use((req, res, next) => {
        // request allow method
        req.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        )
        
        // response allow
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-Requested-With, Content-type, Authorization, Cache-control, Pragma'
        )

        next()
    })

    app.use(morgan('combined'))
}