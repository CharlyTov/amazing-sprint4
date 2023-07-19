let events = data.events

console.log([window]);
console.log(location);
console.log(location.search);

let parametro = location.search
console.log(parametro);

let params = new URLSearchParams(parametro)
console.log(params);

//.get devuelve el valor del parametro al darle el nombre del mismo
let _id = params.get('parametro')
console.log(_id);

//devuelve el objeto con todas sus propiedades
let id = events.find(objetoEvento => objetoEvento._id === _id)
console.log(id);

let CardDetail = document.getElementById('cardDetails')
console.log(CardDetail);

function crearCardDetalles(elemetoHTML,objetoEvento){
    elemetoHTML.innerHTML += `<div class="card mb-3 p-5 bgmain" style="max-width: 90%;">
      <div class="">
        <img src="${objetoEvento.image}" class="img-fluid rounded-start" alt="${objetoEvento.name}>
      </div>
      <div class="col-md-6">
        <div class="card-body">
          <h5 class="card-title">${objetoEvento.name}</h5>
          <p class="card-text">${objetoEvento.description}</p>
          <p class="card-text"><small class="text-muted">Date: ${objetoEvento.date}</small></p>
          <p class="card-text"><small class="text-muted">Place: ${objetoEvento.place}</small></p>
          <p class="card-text"><small class="text-muted">Price: ${objetoEvento.price}</small></p>
        </div>
      </div>
  </div>
    `
}
crearCardDetalles(CardDetail,id)