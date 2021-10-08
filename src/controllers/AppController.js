module.exports = {
    main(accessCounter){
        console.log("Starting counter: " + accessCounter.value);
        return function(request, response, next){
            accessCounter.value += 1;
            console.log("Counter: " + accessCounter.value);
            response.set('Content-Type', 'text/html');
            response.send(Buffer.from(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <style>
                            body {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 100vw;
                                height: 100vh;
                                background: #3495c8;
                            }
                            body div{
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 600px;
                                height:200px;
                                border-radius: 20px;
                                background: #445ebb;
                            }
                            h1   {color: blue;}
                            p    {
                                    color: white;
                                    font-weight: bolder;
                                    font-size: 24pt;
                                }
                        </style>
                    </head>
                    <body>
    
                            <div>
                                <p>Route Blue App</p>
                            </div>
                    
                    </body>
                </html>
            `
            ));
        }
    },
    metrics(request, response){
        let random = Math.random()*100;
        response.set('Content-Type', 'text/text');
        response.send(
            "# TYPE route_blue_random_gauge" + "\n" + 
            "# HELP route_blue_random_gauge This is a random gauge metric" + "\n" +
            'route_blue_random_gauge{app="route-blue"} ' + random
            );
    },
    connection(request, response){
        let random = Math.random()*100;
        if(random >= 40){
            response.status(503).send("Oh uh, something went wrong");
        }
        else{
            response.status(200).send("OK");
        }  
    },
    healthCheck(accessCounter){
        return function(request, response, next){
            if(accessCounter.value >= 5){
                response.status(503).send("Oh uh, something went wrong");
            }
            else{
                response.status(200).send("OK");
            }
        }
    }
}