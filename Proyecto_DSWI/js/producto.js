cargarProductos();
//METODO FECTH

function cargarProductos() {


    fetch("/VentaProducto/ListaProducto").
        then(response => response.json()).
        then(response => {
            let resultado = '';

            console.log(response);
            for (let i in response) {

                resultado += `<div id="imgSeleccion">
                            <a id="mienlace" href="seleccionaProductos/${response[i].codigo}"><img id="" class="" src="${response[i].foto.slice(1)}" alt=""></a>
                            <p> ${response[i].nombre} <br> S/. ${response[i].precio}</p>
                            
                        </div> `
            }

            document.getElementById("resultadoProducto").innerHTML = resultado;

        })
}
function obtener(nom) {
    fetch("buscarProducto?nom=" + nom).
        then(response => response.json()).
        then(response => {
            let resultado = '';
            console.log(response);
            for (let i in response) {
                resultado += `<div id="imgSeleccion">
                            <a id="mienlace" href="seleccionaProductos/${response[i].codigo}"><img id="" class="" src="${response[i].foto}" alt=""></a>
                            <p> ${response[i].nombre} S/. ${response[i].precio}</p>
                            
                        </div> `
            }
            document.getElementById("resultadoProducto").innerHTML = resultado;
        })
}

document.getElementById("search").addEventListener('keyup', () => {
    let valor = document.getElementById('search').value;
    if (valor == "" || valor == 0) {
        cargarProductos();
    } else {
        obtener(valor);
    }

});

function elimina(id) {

    fetch("eliminaProductos?id=" + id).
        then(response => response.json()).
        then(data => {
            listarProductos();
            cargarProductos();
            $('#tablaProducto').DataTable().destroy();
        });
}




listarProductos();
cargarProveedor();
cargarCategoria();
function listarProductos() {
    var editar = "<button type='button' data-toggle='modal'  data-target='#ModalAgregar'" +
        "class='btn btn-success' id='idEditar'>Editar</button>";

    var foto = "<button type='button' data-toggle='modal'  data-target='#myModalFoto'" +
        "class='btn btn-warning' id='btnFoto'>Foto</button>";
    const table = document.querySelector("tbody");

    fetch("ListaProducto").
        then(response => response.json()).
        then(respuesta => {
            console.log(respuesta)
            let resultado = "";
            for (let i = 0; i < respuesta.length; i++) {

                resultado += '<tr taskId=' + respuesta[i].codigo + '>' + '<td>' + respuesta[i].codigo + '</td>' +
                    '<td>' + respuesta[i].nombre + '</td>' +
                    '<td>' + respuesta[i].descripcion + '</td>' +
                    '<td>' + 'S/.' + respuesta[i].precio + '</td>' +
                    '<td>' + respuesta[i].stockActual + '</td>' +
                    '<td>' + respuesta[i].categoria + '</td>' +
                    '<td>' + respuesta[i].proveedor + '</td>' +
                    '<td>' + editar + '</td>' +
                    '<td>' + "<button onclick='elimina(" + respuesta[i].codigo + ")' type='button'" +
                    "class='btn btn-danger' id='idEliminar'>Eliminar</button>" + "</td>" +
                    '<td>' + foto + '</td>' +
                    '</tr>'

            }

            table.innerHTML = resultado;
            $('#tablaProducto').DataTable({
                language: {
                    "decimal": "",
                    "emptyTable": "No hay información",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                    "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                    "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Mostrar _MENU_ Entradas",
                    "loadingRecords": "Cargando...",
                    "processing": "Procesando...",
                    "search": "Buscar:",
                    "zeroRecords": "Sin resultados encontrados",
                    "paginate": {
                        "first": "Primero",
                        "last": "Ultimo",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    }
                },
            });

        });


}







const formulario = document.getElementById("formRegistra");
formulario.addEventListener('submit', function (e) {
    var codigo = document.getElementById("codigo").value;


    e.preventDefault();
    var datos = new FormData(formulario);
    fetch("nuevoProducto", {
        method: 'POST',
        body: datos
    }).
        then(response => response.text()).
        then(respuesta => {
            console.log("Agregado");

            $('#ModalAgregar').modal('hide')


            listarProductos();
            $('#tablaProducto').DataTable().destroy();
            resetear();
            if (codigo == 0) {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Registrado',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Actualizado',
                    showConfirmButton: false,
                    timer: 1500
                })
            }



        });


});



function resetear() {
    var codigo = document.getElementById("codigoProducto").value = 0;
    var nombre = document.getElementById("nombreProducto").value = "";
    var descripcion = document.getElementById("descripcionProducto").value = "";
    var precio = document.getElementById("precioProducto").value = "";
    var stock = document.getElementById("stockProducto").value = "";
    var categoria = document.getElementById("categoriaProducto").value = "";
    var proveedor = document.getElementById("proveedorProducto").value = "";
    var foto = document.getElementById("fotoProducto").value = "";
}

const btnRegistrar = document.getElementById("btnNuevo");
btnRegistrar.addEventListener('click', function (e) {
    const codigo = document.getElementById("codigo");
    codigo.value = 0;
})



function cargarProveedor() {


    fetch("Producto/ObtenerProveedor").
        then(response => response.json())
        .then(miJson => {
            console.log(miJson);
            let resultado = "";
            for (let i = 0; i < miJson.length; i++) {
                resultado += "<option value='" + miJson[i].codigo + "'> " + miJson[i].nomprov + "</option >"

            }
            document.getElementById("proveedorProducto").innerHTML = resultado;
        })



}


function cargarCategoria() {


    fetch("Producto/ObtenerCategoria").
        then(response => response.json())
        .then(miJson => {
            console.log(miJson);
            let resultado = "";
            for (let i = 0; i < miJson.length; i++) {
                resultado += "<option value='" + miJson[i].codigo + "'> " + miJson[i].nombre + "</option >"

            }
            document.getElementById("categoriaProducto").innerHTML = resultado;
        })



}



