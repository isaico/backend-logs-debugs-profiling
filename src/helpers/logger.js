import pino from 'pino'

const loggerProd = pino('warns.log')
loggerProd.level='warn'

const loggerDev = pino()
loggerDev.level='info'

// const loggerDevWarns = pino('warn.log')
// loggerDevWarns.level = 'warn'

let logger 

// eslint-disable-next-line no-undef
if(process.argv[2]==='PROD'){
    logger = loggerProd
}else{
    logger = loggerDev
    
}
export default logger