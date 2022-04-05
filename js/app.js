const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // Agrega el curso al presionar AGREGAR AL CARRITO
  listaCursos.addEventListener("click", agregarCurso);

  // Elimina el curso del carrito
  carrito.addEventListener("click", eliminarCurso);

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    // console.log("Vaciando carrito");
    articulosCarrito = []; //reseteamos el arreglo

    limpiarHTML(); //limpiamos el HTML
  }
  );


}

// FUNCIONES
function agregarCurso(e) {
  e.preventDefault(); //evita que se vaya arriba al presionar

  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    leerDatosCurso(curso);
  }
}

// Eliminar curso
function eliminarCurso(e) {
  console.log(e.target.classList)
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    // Eliminar del carrito por medio del data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    
    carritoHTML(); //actualiza el carrito
  }
}





// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
  console.log(curso);

  //Creo un objeto con la info del curso
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // REVISA SI UN ELEMENTO YA ESXISTE EN EL CARRITO (Metodo "SOME")
  if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
    const cursos = articulosCarrito.map( curso => {
         if( curso.id === infoCurso.id ) {
              curso.cantidad++;
               return curso; // Retorna el objeto actualizado
          } else {
               return curso; // Retorna el objeto que nos aumento su cantidad
       }
    })
    articulosCarrito = [...cursos];
}  else {
  //Agrega elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
}

  console.log(articulosCarrito);

  carritoHTML();
}

//Muestra el carrito de compras en el HTML

function carritoHTML() {
  //Antes de crear el HTM, Lo limpio
  limpiarHTML();

  //Recorre el carrio y genera el Html
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id} = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
      <img src="${imagen}" width="100">
    </td>
    <td> ${titulo} </td>
    <td> ${precio} </td>
    <td> ${cantidad} </td>
    <td> 
      <a href="#" class="borrar-curso" data-id="${curso.id}" > X </a>
    </td>
    `;

    //Agrega el HTML del carrito en el Tbody
    contenedorCarrito.appendChild(row);
  });
}

// Elimina los cursos del Tbody
function limpiarHTML() {
  // Forma menos eficiente de limpiar HTML
  // contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
