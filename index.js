const tableContent = document.getElementById('infoFromUser');
const btnAgregar = document.getElementById('agregar');
const btnLimpiar = document.getElementById('limpiar');
const inputMonto = document.getElementById('inputMonto');
const selectTipoGastos = document.getElementById('tipoGastos');
const tableTotal = document.getElementById('Total');
const cardSection = document.getElementById('cardsContainer'); 
let total = 0;

const cardsInfo = [
    {
        nombre: 'Vivienda',
        icono: 'fa-solid fa-house',
        porcentaje: 0,
        total:0,
        cantidadMontos: 0
    },
    {
        nombre: 'Préstamos',
        icono: 'fa-solid fa-landmark',
        porcentaje: 0,
        total:0,
        cantidadMontos: 0
    },
    {
        nombre: 'Alimentación',
        icono: 'fa-solid fa-utensils',
        porcentaje: 0,
        total:0,
        cantidadMontos: 0
    },
    {
        nombre: 'Combustible',
        icono: 'fa-solid fa-gas-pump',
        porcentaje: 0,
        total:0,
        cantidadMontos: 0
    },
    {
        nombre: 'Servicios Básicos',
        icono: 'fa-solid fa-wifi',
        porcentaje: 0,
        total:0,
        cantidadMontos: 0
    },
    {
        nombre: 'Servicios Streaming',
        icono: 'fa-brands fa-spotify',
        porcentaje: 0,
        total:0,
        cantidadMontos: 0
    },
    {
        nombre: 'Ropa',
        icono: 'fa-solid fa-shirt',
        porcentaje: 0,
        total:0,
        cantidadMontos: 0
    },
    {
        nombre: 'Seguros',
        icono: 'fa-solid fa-file-contract',
        porcentaje: 0,
        total:0,
        cantidadMontos: 0
    }
    

]

//? Genera dinámicamente las cards de desgloce
cardsInfo.forEach(element => {
    let card = document.createElement('div');
    card.className += 'col-sm-2 col-md-6 col-lg-3'
    card.innerHTML = `<article class="card text-center bg-light text-secondary">
                        <div class="card-body">
                            <h4><i class="${element.icono}"></i></h4>
                            <h4 class="card-title">${element.nombre}</h4>
                            <p class="card-text montoCard">Monto total: ¢${element.total == undefined ? 0 : element.total }</p>
                            <p class="card-text porcentajeCard">Porcentaje: ${element.porcentaje}%</p>
                        </div>
                      </article>
                     `
    cardSection.appendChild(card);
});

//? Función para limpiar los campos de input y select del tipo de gasto
function LimpiarCampos() {
    inputMonto.value = "";
    selectTipoGastos.selectedIndex = 0;
}






//*Retorna el porcentaje de un tipo de gasti en específico
function ObtenerPorcentaje(montoTotal, objeto) {
    return !montoTotal || !objeto.total ? 0 : (objeto.total / montoTotal) * 100;
}

//*Imprime el monto total en el card de desgloce
function MostrarMontoTotal(cardItem, objeto, monto) {
    objeto.total += Number(monto);
    objeto.cantidadMontos++;
    cardItem.textContent = `Monto total: ¢${objeto.total}`;
}

//* Imprime el porcentaje (con relación al gasto total) en el card de desgloce
function MostrarPorcentajesCards(cardItem, objeto, montoTotal){
    objeto.porcentaje = ObtenerPorcentaje(montoTotal, objeto).toFixed(1);
    cardItem.textContent = `Porcentaje: ${objeto.porcentaje}%`;
}

//*Actualiza los porcentajes de todas las cards
function ActualizarPorcentajes(arregloObjeto, itemHtml, total) {
    for (let index = 0; index < arregloObjeto.length; index++) {
        MostrarPorcentajesCards(itemHtml[index], arregloObjeto[index], Number(total));
    }
}


let porcentajeCard = document.querySelectorAll('.porcentajeCard');
let montoCard = document.querySelectorAll('.montoCard');

btnAgregar.addEventListener('click', ()=> {
    if((inputMonto.value != null && inputMonto.value != ' ') && selectTipoGastos.selectedIndex > 0) {
        
        
        //* Obtiene el monto ingresado en el input y el tipo de gasto seleccionado
        let monto = inputMonto.value;
        let tipoGasto = selectTipoGastos[selectTipoGastos.selectedIndex].text;

        total += Number(monto);
        
        //*
        let index = selectTipoGastos.selectedIndex-1;

        switch(selectTipoGastos.selectedIndex) {
            case 1:
                MostrarMontoTotal(montoCard[index], cardsInfo[index], monto);
                break;
            case 2:
                MostrarMontoTotal(montoCard[index], cardsInfo[index], monto);
                break;
            case 3:
                MostrarMontoTotal(montoCard[index], cardsInfo[index], monto);
                break;
            case 4:
                MostrarMontoTotal(montoCard[index], cardsInfo[index], monto);
                break;
            case 5:
                MostrarMontoTotal(montoCard[index], cardsInfo[index], monto);
                break;
            case 6:
                MostrarMontoTotal(montoCard[index], cardsInfo[index], monto);
                break;
            case 7:
                MostrarMontoTotal(montoCard[index], cardsInfo[index], monto);
                break;
            case 8:
                MostrarMontoTotal(montoCard[index], cardsInfo[index], monto);
                break;
            
        }
        console.log(porcentajeCard);
        ActualizarPorcentajes(cardsInfo, porcentajeCard, total)
        tableTotal.textContent = `¢${total}`;

        //*Crea un nuevo elemento tr que dentro contiene los elementos con sus respectivos datos para crear la fila de la tabla
        let nuevoTr = document.createElement('tr');
        nuevoTr.innerHTML = `<td class="col-6">${tipoGasto}</td>
                            <td class="col-5" id='monto'>¢${monto}</td>
                            <td class="col-auto align-content-center text-center"> <button type="button" onclick="" class="btn text-primary btn-secondary-hover deleteButton"><i class="fa-solid fa-trash text-danger"></i></button></td>
                            `
        tableContent.appendChild(nuevoTr);

        

        //* Se recupera el botón del elemento creado y se llama a la función que le agrega el evento eliminar fila.
        let btnEliminar = nuevoTr.querySelector('.deleteButton');
        
        EliminarFila(btnEliminar, nuevoTr, monto);

        LimpiarCampos();


    }
})

//?Elimina un elemento
function EliminarFila(boton, elemento, monto) {
    boton.addEventListener('click', ()=> {
        let tipoGastoElemento = elemento.children[0].textContent;
        switch(tipoGastoElemento) {
            case 'Vivienda':
                let objeto = cardsInfo.filter((elemento) => elemento.nombre == tipoGastoElemento);
                objeto[0].total -= monto;
                ActualizarPorcentajes(cardsInfo, porcentajeCard, total);
                MostrarMontoTotal(montoCard[0], objeto[0], objeto[0].total);
        }
        elemento.remove();
        total -= monto;
        if(total==0) {
            tableTotal.textContent = '';
            return;
        }
        tableTotal.textContent = total;
    })
}

btnLimpiar.addEventListener('click', LimpiarCampos, false);