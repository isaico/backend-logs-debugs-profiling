// import { getRandom } from '../helpers/random.js';
import getRandom from '../helpers/random.js';
import { fork } from 'child_process';
const calculo = fork('./src/helpers/random_sinBloqueo.js');

export const getRandomAsyncController = async (req, res) => {
  const { cant } = req.query;

  calculo.on('message', (resultado) => {
    console.log('resultado', resultado);
    res.status(200).json(resultado);
  });
  if (cant) {
    const stringCantidad = cant.toString();
    calculo.send(stringCantidad);
  } else {
    calculo.send('100000');
  }
};

// export const getRandomController = async (req, res) => {
//   const { cant } = req.query;
//   const numeros = { random: [] };
//   const rango = 1000;

//     calculo.on('message',(resultado)=>{
//         console.log('resultado:',resultado)
//     })
//     calculo.send('start')

//   if (cant) {
//     for (let index = 0; index < cant; index++) {
//       const random = getRandom(rango);
//       numeros.random.push(random);
//       console.log(random);
//     }
//     console.log(numeros);
//     res.json(numeros);
//   } else {
//     const rangoAlto = 2e4;
//     for (let index = 0; index < rangoAlto; index++) {
//       const random = getRandom(rango);
//       numeros.random.push(random);
//       console.log(random);
//     }
//     res.json(numeros);
//     console.log(numeros);
//   }
// };
