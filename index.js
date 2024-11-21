const tableContent = document.getElementById('infoFromUser');
const btnAgregar = document.getElementById('agregar');
const btnLimpiar = document.getElementById('limpiar');
const inputMonto = document.getElementById('inputMonto');
const selectTipoGastos = document.getElementById('tipoGastos');

let montosVivienda, montosPrestamo, montosAlimentacion, montosCombustible, montosServicioBasico, montosStreaming, montosRopa, montosSeguros  = [];

//? Función para limpiar los campos de input y select del tipo de gasto
function limpiarCampos() {
    inputMonto.value = "";
    selectTipoGastos.selectedIndex = 0;
}

btnAgregar.addEventListener('click', ()=> {
    if(inputMonto.value != null && selectTipoGastos.selectedIndex > 0) {
        let tipoGasto = selectTipoGastos[selectTipoGastos.selectedIndex].text;

        let nuevoTr = document.createElement('tr');
        nuevoTr.innerHTML = `<td class="col-3">${tipoGasto}</td>
                            <td class="col-auto">Hola Mundo</td>
                            <td class="col-3">Hola Mundo</td>
                            <td class="col-3 align-content-center text-center"><i class="fa-solid fa-trash text-danger"></i></td>
                            `
        tableContent.appendChild(nuevoTr);

    }
})

btnLimpiar.addEventListener('click', limpiarCampos, false);