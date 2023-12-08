let lightA = 6
let lightB = 10
let lightC = 15

let allLights = [6, 10, 15]

for (let n = 1; n < 10; n++) {
  let product = lightA * n
  console.log(product)
  let modulos = allLights.map((x) => product % x)
  console.log({ modulos })
  if (checkIfAllZero(modulos)) {
    console.log(cycleOfN)
    break
  }
}

function checkIfAllZero(modulos) {
  return modulos.filter((x) => x === 0).length === modulos.length
}

// 6 12 18 24 30 36 42 48 54 60
// 10, 20, 30
// 15, 30
