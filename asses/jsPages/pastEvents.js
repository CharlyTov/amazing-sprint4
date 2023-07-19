let container = document.getElementById("contenedorCards")
let contenedorInputs = document.getElementById("contenedorInputs")
let inputSearch = document.getElementById("search")

let events = []
let currentData = ""
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(eventos => eventos.json())
    .then(eventos => {

        events = eventos.events
        currentData = eventos.currentDate
        imprimirCards(events)

        // crear array de categorias
        let categorias = events.map(events => events.category)
        let categoriasUnicas = Array.from(new Set(categorias))//crear array / set quita lo repetido
        mostrarCheckBox(categoriasUnicas)

        // Crear variable en donde pueda obtener sus propiedades del type checkbox->query
        let checkBox = document.querySelectorAll("input[type='checkbox']")

        contenedorInputs.addEventListener("change", () => {
            let filtroCruzado = filtroCruzadoFunc(events, inputSearch.value, checkBox)
            container.innerHTML = ""
            
            //condicion que me imprime en pantalla las cards segun el dato del filtro o si no se filtro nada
            if (filtroCruzado.length == 0) {
                container.innerHTML = '<h2>No results found</h2>'
            } else {
                imprimirCards(filtroCruzado)
            }
        })
        
        inputSearch.addEventListener("input", () => {
            container.innerHTML = ""
            let filtroCruzado = filtroCruzadoFunc(events, inputSearch.value, checkBox)
            
            //condicion que me imprime en pantalla las cards segun el dato del filtro o si no se filtro nada
            if (filtroCruzado.length == 0) {
                container.innerHTML = '<h2>No results found</h2>'
            } else {
                imprimirCards(filtroCruzado)
            }
        })
    })
    .catch(error => console.error(error))

function crearCards(objeto){
    return `<div class="col d-flex justify-content-center">
                <div class="card h-100 w-75 card border-danger">
                    <img src="${objeto.image}" class="card-img-top h-50 p-3" alt="${objeto.name}">
                    <div class="card-body">
                    <h5 class="card-title">${objeto.name}</h5>
                    <p class="card-text">${objeto.description}</p>
                </div>
                <div class="d-flex justify-content-evenly">
                    <p>Price: ${objeto.price}</p>
                    <a class="text-decoration-none text-dark details" href="./details.html?parametro=${objeto._id}">Details</a>
                </div>
                </div>
            </div>`
}

function imprimirCards(parametroArrayEventos) {
    let arrayDateFiltrado = parametroArrayEventos.filter(evento => evento.date < currentData)
    let template = ""
    for (let evento of arrayDateFiltrado) {
        template += crearCards(evento)
    }
    container.innerHTML += template
}

//Sprint3

function crearCheckBox(categoria){
    return `<div class="col-12 col-md-4 col-lg-4 pt-2 d-flex align-items-center">
            <label class="col-6 col-md-8 col-lg-5" for="${categoria}">${categoria}</label>
            <input class="col-10 col-md-2 col-lg-1" type="checkbox" name="accept" id="${categoria}" value="${categoria}"></div>`
}


let mostrarCheckBox = (events) => {
    let input = ""
    events.forEach(element => {
        input += crearCheckBox(element)
    });
    contenedorInputs.innerHTML += input
}

function filtrarPorCategoria(array, nodeList) {
    let arrayChecked = Array.from(nodeList).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
    let aux = array.filter(event => arrayChecked.includes(event.category) || arrayChecked.length == 0)
    return aux
}

function filterSearch(array, input) {
    let arrayFilterSerch = array.filter(evento => evento.name.toLowerCase().startsWith(input.toLowerCase()))
    return arrayFilterSerch
}

function filtroCruzadoFunc(array, input, checkBox) {
    let filtroSearchCruzado = filterSearch(array, input)
    let filtroCheckCruzado = filtrarPorCategoria(filtroSearchCruzado, checkBox)
    return filtroCheckCruzado
}