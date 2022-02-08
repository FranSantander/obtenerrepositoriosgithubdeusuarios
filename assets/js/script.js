// https://api.github.com/users/ClaudiaRojasSoto
//https://api.github.com/users/ClaudiaRojasSoto/repos?page=1&per_page={cantidad_repos}




//REQUERIMIENTO 1
// URL Base obtiene los usuarios en forma asincrónica con request
const baseUrl = 'https://api.github.com/users';

// Request
const request = async (url) => {
  const results = await fetch(url);
  const response = await results.json();
  return response;
}

// Función asíncrona. Crea una URL y lama a la función request(manda la url como parámetro)
const getUser = async (nombre) => {
  const url = `${baseUrl}/${nombre}`
  return request(url);
}
// Función asíncrona. Crea una URL y lama a la función request(manda la url como parámetro)
const getRepo = async (nombre, pagina, cantidad_repos) => {
  const url = `${baseUrl}/${nombre}/repos?page=${pagina}&per_page=${cantidad_repos}`;
  return request(url);

}


//REQUERIMIENTO 
let formulario = document.querySelector('form');

//Evento escucha
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  //Captura de valores desde el formulario
  const nombre = document.getElementById('nombre').value;
  const pagina = document.getElementById('pagina').value;
  const repoPagina = document.getElementById('repoPagina').value;


  //REQUERIMIENTO 3
  //Llamado a getUser y getRepo
  Promise.all([getUser(nombre), getRepo(nombre, pagina, repoPagina)])
    .then(resp => {

      let resultados = document.getElementById('resultados');

      // Bloque if7else para error y para datos de la pagina (mostrar)

      if (resp[0].nombre === null) {//indica nada
        // Limpia área de Resultados
        resultados.innerHTML = '';

        // Crea error personalizado
        throw new Error('El usuario no existe');
      }
      else {
        //REQUERIMIENTO 4
        // Tabla para presentar resultados
        resultados.innerHTML = `<table class='container'>
                                        <tr>
                                            <th>Datos de Usuario</th>
                                            <th>Nombre de Repositorios</th>
                                        </tr>
                                        <tr>
                                            <td class='p-3'>
                                                <img src=${resp[0].avatar_url} class='avatar' style="width: 75%; mx-auto>
                                                <p>Nombre de usuario: ${resp[0].name}</p>
                                                <p>Nombre de login: ${resp[0].login}</p>
                                                <p>Cantidad de Repositorios: ${resp[0].public_repos}</p>
                                                <p>Localidad: ${resp[0].location}</p>
                                                <p>Tipo de usuario: ${resp[0].type}</p>
                                            </td>
                                            <td class='p-3' id='segunda_columna'>
                                                
                                            </td>
                                        </tr>
                                    </table>`;

        // For recorre el arreglo para agregar repos a la columna (2)
        for (let i = 0; i < resp[1].length; i++) {
          $('#segunda_columna').append(`<a href=${resp[1][i].html_url} target='_blank'>${resp[1][i].name}</a></br>`);
        }
      }

    })

    //REQUERIMIENTO 5
    .catch(err => alert(err)); // Atrapa el error y muestra un alert() con el mensaje de error creado anteriormente

  // Limpia los campos del formulario en cada evento submit
  document.getElementById('nombre').value = '';
  document.getElementById('pagina').value = '';
  document.getElementById('repoPagina').value = ''

})