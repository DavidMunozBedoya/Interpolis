//console.log("hola 1");
import * as bootstrap from 'bootstrap'
import Swal from 'sweetalert2';
const tbody = document.querySelector('#tbody');
const url = "http://localhost:4100/ciudadano/";
const modal = new bootstrap.Modal(document.getElementById('modalCiudadanos'));
const btnCrear = document.querySelector('#btnCrear');
const frmCiudadanos = document.querySelector("#frmCiudadanos");
let codigo = "";
var opcion = "";

let nombre = document.querySelector("#nombre");
let apellidos = document.querySelector("#apellidos");
let apodo = document.querySelector("#apodo");
let fechaNacimiento = document.querySelector("#fechaNacimiento");
let planetaOrigen = document.querySelector("#planetaOrigen");
let planetaResidencia = document.querySelector("#planetaResidencia");
let foto = document.querySelector("#foto");
let codigoqr = document.querySelector("#codigoqr");

document.addEventListener("DOMContentLoaded", cargarCiudadanos);

function cargarCiudadanos(){
    fetch(url+"listar")
    .then(Response => Response.json())
    .then((datos)=>{
        //console.log(datos);
        llenarTabla(datos);
    });
}


function llenarTabla(datos) {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = ""; // limpiar antes de llenar

    datos.data.forEach(ciudadano => {
        const fecha = new Date(ciudadano.fecha_nacimiento);
        const fechaFormateada = fecha.toLocaleDateString('es-CO'); // formato: dd/mm/yyyy
        let fila = `
        <tr>
            <!--<td class="text-nowrap">${ciudadano.codigo}</td>-->
            <td>${ciudadano.nombre}</td>
            <td>${ciudadano.apellidos}</td>
            <td>${ciudadano.apodo_nickname}</td> 
            <td>${fechaFormateada}</td> 
            <td>${ciudadano.planeta_origen}</td> 
            <td>${ciudadano.planeta_residencia}</td> 
            <td>${ciudadano.foto}</td> 
            <td>${ciudadano.codigo_qr}</td>  
            <td>
                <button type="button" class="btn btn-primary btn-sm btnEditar">
                    <i class="bi bi-pencil"></i>
                </button>
                <button type="button" class="btn btn-danger btn-sm btnBorrar">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
        `;
        tbody.innerHTML += fila;
    });
}

btnCrear.addEventListener("click", ()=>{
    nombre.value = "";
    apellidos.value = "";
    apodo.value = "";
    fechaNacimiento.value = "";
    planetaOrigen.value = "";
    planetaResidencia.value = "";
    foto.value = "";
    codigoqr.value = "";
    opcion = "crear";
    modal.show();
})

tbody.addEventListener("click", (e)=>{
    if(e.target.closest(".btnEditar")){
        const boton = e.target.closest(".btnEditar");
        const fila = boton.closest("tr");
        codigo = fila.children[0].textContent;
        nombre.value = fila.children[1].textContent;
        apellidos.value = fila.children[2].textContent;
        apodo.value = fila.children[3].textContent;
        fechaNacimiento.value = fila.children[4].textContent;
        planetaOrigen.value = fila.children[5].textContent;
        planetaResidencia.value = fila.children[6].textContent;
        foto.value = fila.children[7].textContent;
        codigoqr.value = fila.children[8].textContent;
        opcion = "editar";
        modal.show();
    }
    if(e.target.closest(".btnBorrar")){
        const boton = e.target.closest(".btnBorrar");
        const fila = boton.closest("tr");
        codigo = fila.children[0].textContent;
        Swal.fire({
            title: "Seguro de eliminar el registro :" + codigo + "?",
            text: "Si lo borras cambia el estado a muerto!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) =>{
            fetch(url + "eliminacionLogica/" + codigo,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    estado: 2,
                }),
            })
            .then((Response) => Response.json())
            .then((Response) =>{
                Swal.fire("Registro eliminado correctamente", {
                    icon: "success",
                });
            });
        });
    }

});

frmCiudadanos.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(nombre.value === "" || apellidos.value === "" || apodo.value === "" || fechaNacimiento.value === "" || planetaOrigen.value === "" || planetaResidencia.value === "" || foto.value === "" || codigoqr.value === ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son obligatorios!',
        });
    }else{
        if(opcion === "crear"){
            fetch(url+"crearRegistro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                nombre: nombre.value,
                apellidos: apellidos.value,
                apodo_nickname: apodo.value,
                fecha_nacimiento: fechaNacimiento.value,
                planeta_origen: planetaOrigen.value,
                planeta_residencia: planetaResidencia.value,
                foto: foto.value,
                codigo_qr: codigoqr.value, 
                estado: 1, // Estado vivo              
                }),
            })
            .then(Response => Response.json())
            .then(Response=>
                Swal.fire("Creado Exitosamente")
                //console.log(Response)
                //location.reload()
            );
        }
        if(opcion === "editar"){
        //console.log("editar");
        // recibir los datos del formulario
        fetch(url+"modificar/"+codigo,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: nombre.value,
                apellidos: apellidos.value,
                apodo_nickname: apodo.value,
                fecha_nacimiento: fechaNacimiento.value,
                planeta_origen: planetaOrigen.value,
                planeta_residencia: planetaResidencia.value,
                foto: foto.value,
                codigo_qr: codigoqr.value,                   
            }),
        })
        .then(response => response.json())
        .then(response=>{
            Swal.fire("modificado Exitosamente!!!")
        });

    }
    modal.hide();
    }
})
