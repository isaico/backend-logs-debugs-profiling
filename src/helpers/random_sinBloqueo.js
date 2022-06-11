const getRandom = (cantidadComputo) => {
    const random = {numeros:[]}
    for (let index = 0; index < cantidadComputo; index++) {
        let num = Math.floor(Math.random() * (1000 - 0)) + 1;
        console.log(num)
        random.numeros.push(num)
    }
    return random;
  };

process.on('message', (msg) => {
  const number=Number(msg)
  const result = getRandom(number);
  process.send(result);
});