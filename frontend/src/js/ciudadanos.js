//console.log("hola 1");
import * as bootstrap from 'bootstrap'
import Swal from 'sweetalert2';
const tbody = document.querySelector('#tbody');
const url = "https://backend-interpolis.onrender.com/ciudadano/";
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

document.addEventListener("DOMContentLoaded", cargarCiudadanos);

function cargarCiudadanos() {
    fetch(url + "listarciudadanos")
        .then(Response => Response.json())
        .then((datos) => {
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
            <td>${ciudadano.codigo}</td>
            <td>${ciudadano.nombre}</td>
            <td>${ciudadano.apellidos}</td>
            <td>${ciudadano.apodo_nickname}</td> 
            <td>${fechaFormateada}</td> 
            <td>${ciudadano.planeta_origen}</td> 
            <td>${ciudadano.planeta_residencia}</td> 
            <td><img src="https://backend-interpolis.onrender.com/fotos/${ciudadano.foto}" width="50"></td>
            <td><img src="https://backend-interpolis.onrender.com/qrs/${ciudadano.codigo_qr}" width="50"></td> 
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

btnCrear.addEventListener("click", () => {
    nombre.value = "";
    apellidos.value = "";
    apodo.value = "";
    fechaNacimiento.value = "";
    planetaOrigen.value = "";
    planetaResidencia.value = "";
    foto.value = "";
    opcion = "crear";
    modal.show();
})

tbody.addEventListener("click", (e) => {
    if (e.target.closest(".btnEditar")) {
        const boton = e.target.closest(".btnEditar");
        const fila = boton.closest("tr");
        codigo = fila.children[0].textContent;
        nombre.value = fila.children[1].textContent;
        apellidos.value = fila.children[2].textContent;
        apodo.value = fila.children[3].textContent;
        const fechaTabla = fila.children[4].textContent;
        const [dia, mes, año] = fechaTabla.split('/');
        fechaNacimiento.value = `${año}-${mes}-${dia}`;
        console.log("la fecha de nacimiento es: ", fechaNacimiento.value);
        planetaOrigen.value = fila.children[5].textContent;
        planetaResidencia.value = fila.children[6].textContent;
        opcion = "editar";
        modal.show();
    }
    if (e.target.closest(".btnBorrar")) {
        const boton = e.target.closest(".btnBorrar");
        const fila = boton.closest("tr");
        codigo = fila.children[0].textContent;
        Swal.fire({
            title: "¿Seguro de eliminar el registro: " + codigo + "?",
            text: "Si lo borras cambia el estado a muerto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(url + "eliminarregistro/" + codigo, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                    .then((Response) => Response.json())
                    .then((Response) => {
                        if (
                        Response.message &&
                        Response.message.includes("a foreign key constraint fails")
                    ) {
                        Swal.fire({
                            icon: 'error',
                            title: 'No se pudo eliminar',
                            text: 'El ciudadano tiene registros relacionados y no puede ser eliminado.'
                        });
                    } else {
                        Swal.fire({
                            title: "Registro eliminado correctamente",
                            icon: "success"
                        });
                        cargarCiudadanos();
                    }
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al intentar eliminar.'
                    });
                    console.error(error);
                });
            }
        });
    }
});

frmCiudadanos.addEventListener('submit', (e) => {
    e.preventDefault();
    if (
        nombre.value === "" ||
        apellidos.value === "" ||
        apodo.value === "" ||
        fechaNacimiento.value === "" ||
        planetaOrigen.value === "" ||
        planetaResidencia.value === "" ||
        foto.files.length === 0 // Validar archivo foto
    ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son obligatorios!',
        });
    } else {
        const formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('apellidos', apellidos.value);
        formData.append('apodo_nickname', apodo.value);
        formData.append('fecha_nacimiento', fechaNacimiento.value);
        formData.append('planeta_origen', planetaOrigen.value);
        formData.append('planeta_residencia', planetaResidencia.value);
        formData.append('foto', foto.files[0]); // Solo la foto

        if (opcion === "crear") {
            fetch(url + "crearregistro", {
                method: "POST",
                body: formData
            })
                .then(Response => Response.json())
                .then(Response => {
                    Swal.fire("Creado Exitosamente")
                    cargarCiudadanos();
                    //location.reload()
                });
        }
        if (opcion === "editar") {
            //console.log("editar");
            fetch(url + "actualizarregistro/" + codigo, {
                method: "PUT",
                body: formData
            })
                .then(Response => Response.json())
                .then(Response => {
                    Swal.fire("Actualizado Exitosamente")
                    console.log(Response)
                    cargarCiudadanos();
                });
        }
    }
    modal.hide();
});
