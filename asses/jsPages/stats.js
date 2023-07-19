const FirstOne = document.getElementById("1.1")
const FirstTwo = document.getElementById("1.2")
const FirstThree = document.getElementById("1.3")
const segundaTabla = document.getElementById("segundaTabla")
const terceraTabla = document.getElementById("terceraTabla")

let date
let datosEvents

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(respuesta => respuesta.json())
.then(data => {
    datosEvents = data.events
    date = data.currentDate

    

    let eventosPasados = datosEvents.filter(evento => evento.date < date)
    //console.log(eventosPasados)
    let eventosUpCom = datosEvents.filter (evento => evento.date >= date)
    //console.log(eventosUpCom);


    const arrayOrdenado = Array.from(datosEvents).sort(function (a,b) {
        return b.capacity - a.capacity
    })
    //console.log(arrayOrdenado)

    let mayorCapacidad = arrayOrdenado[0].capacity.toLocaleString('de-DE')
    let mayorCapacidadNombre =arrayOrdenado[0].name
    //console.log(mayorCapacidadNombre);

    eventosPasados.sort((a,b) => calcularPorcentajeEvento(a.assistance,a.capacity) - calcularPorcentajeEvento(b.assistance,b.capacity))
    let eventoMenor = eventosPasados[0]
    let eventoMayor = eventosPasados[eventosPasados.length-1]
    let porcentajeMayor = calcularPorcentajeEvento(eventoMayor.assistance, eventoMayor.capacity).toFixed(1)
    let porcentajeMenor = calcularPorcentajeEvento(eventoMenor.assistance, eventoMenor.capacity)
    primeraTabla(eventoMayor,FirstOne,porcentajeMayor)
    primeraTabla(eventoMenor,FirstTwo,porcentajeMenor)
    primeraTablaTwo(mayorCapacidadNombre,FirstThree,mayorCapacidad)
    
    
    //Tabla 3 Past Events
    
    let categoriaPass = eventosPasados.map(evento => evento.category)
    let categoriaPassArray = Array.from(new Set(categoriaPass))
    // Ver array de categorias de eventos pasados sin repetir 
    //console.log(categoriaPassArray);  

    let asistenciaPromedio
    let revenues

    categoriaPassArray.forEach(categoriaPasado =>{
        revenues = 0
        asistenciaPromedio = 0
        //filtramos por eventos en categorias , calculamos las ganancias y asistencia
        let eventosPorCategoria = eventosPasados.filter(eventoPasado => eventoPasado.category == categoriaPasado)

        eventosPorCategoria.forEach(evento =>{
            revenues += evento.assistance * evento.price
            asistenciaPromedio += calcularPorcentajeEvento(evento.assistance, evento.capacity)
        
    })
    revenues = revenues / eventosPorCategoria.length
    asistenciaPromedio = asistenciaPromedio / eventosPorCategoria.length
    crearTerceraTabla(categoriaPasado, asistenciaPromedio, revenues, terceraTabla)
    })    

         // Tabla 2 UpComing Events
    let categoriaFuruto = eventosUpCom.map(evento => evento.category)
    let arrayUpCom = Array.from(new Set(categoriaFuruto))
    // Ver array de categorias de eventos futuros sin repetir 
    //console.log(arrayUpCom);

    arrayUpCom.forEach(categoriaFuturo =>{
        revenues = 0
        asistenciaPromedio = 0

        let eventosPorCategoriaFuturo = eventosUpCom.filter(eventoFuturo => eventoFuturo.category == categoriaFuturo)

        eventosPorCategoriaFuturo.forEach(evento => {
            revenues += evento.estimate * evento.price
            asistenciaPromedio += calcularPorcentajeEvento(evento.estimate,evento.capacity)
        })
        revenues = revenues / eventosPorCategoriaFuturo.length
        asistenciaPromedio = asistenciaPromedio / eventosPorCategoriaFuturo.length
        crearSeguntaTabla(categoriaFuturo, asistenciaPromedio, revenues,segundaTabla)
    })  
})
.catch(error => console.log(error))

function calcularPorcentajeEvento(assistance,capacity){
    let porcentaje = (assistance / capacity)*100
        return porcentaje
}

function primeraTabla(evento,contain,porcentaje) {
    contain.innerHTML = `
    ${evento.name} ${porcentaje}%
    `
}

function primeraTablaTwo(evento,contain,capacidad) {
    contain.innerHTML = `
    ${evento} ${capacidad}
    `
}

function crearSeguntaTabla(name, assistancePromedio,revenues,contain) {
    contain.innerHTML += `
    <tr>
        <td>${name}</td>
        <td>${revenues.toFixed(2)}</td>
        <td>${assistancePromedio.toFixed(2)}</td>
    </tr>
    `
}

function crearTerceraTabla(name, assistancePromedio,revenues,contain) {
    contain.innerHTML += `
    <tr>
        <td>${name}</td>
        <td>${revenues.toFixed(2)}</td>
        <td>${assistancePromedio.toFixed(2)}</td>
    </tr>
    `
}


