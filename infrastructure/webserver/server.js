import { createTerminus } from "@godaddy/terminus";


export default function serverConfig(app, ServerInit) 
{
    function health() {
        return Promise.resolve()
    }

    function onSignal() {
        console.log('server is starting cleanup');
        return new Promise((resolve, reject) => {
          mongoose
            .disconnect(false)
            .then(() => {
              console.info('Mongoose has disconnected');
              resolve();
            })
            .catch(reject);
        });
      }
    
    function beforeShutdown() {
        return new Promise((resolve) => {
          setTimeout(resolve, 15000);
        });
      }
    
    function onShutdown() {
        console.log('cleanup finished, server is shutting down');
      }

    function startService() {
        createTerminus(ServerInit, {
            logger:console.log,
            signal:'SIGINT',
            healthChecks: {
                '/health' :  health
            },
            onSignal,
            onShutdown,
            beforeShutdown
        }).listen(config.port, config.host, () => {
            console.log(
                'Express server listening on %d, in %s mode',
                config.port,
                app.get('env')
            );
        })
    }

    return {
        startService
    }
}