# clase14-backend-argv-process

# comandos para levantar los servers
 estos son  los comandos basicos que utilice  
## PM2
* pm2 start ./src/server.js --name="Server" --watch -- --port=4000 (modo fork)
* pm2 start ./src/server.js --name="Server2" --watch -i max -- --port=4000 (modo cluster, remplazar "max" por la cantidad de instancias) 
* pm2 list (lista de servidores)
* pm2 monit (monitoreo de servidores)
  
## forever
* forever start ./src/server.js (levanta servidor)
* forever list (observar los servidores añadidos a forever)
* forever stopall (detener todos los servidores de forever)

## nodemon
al levantar el server con npm start el server iniciara en modo cluster automaticamente tomando como maximo los nucleos del procesador, se puede modificar alterando la variable numCpus
...el servidor se levanta por defecto en  el puerto 8080 (se puede modificar en el package.json --port XXXX)
* npm start 



