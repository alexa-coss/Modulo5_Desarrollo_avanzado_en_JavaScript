/* Esto si debería devolver lo mismo siempre */
const BASE_URL_API = "https://pokeapi.co/api/v2";
const formNombre = document.querySelector('#searchForm');
const salida = document.querySelector('#output')


/* Esto no devuelve lo mismo siempre */
const obtenerPokemonPorNombre = async (nombre) => {
    const url_consulta = `${BASE_URL_API}/pokemon/${nombre}`;

    const response = await fetch(url_consulta);

    /*fetch(url_consulta)
            .then(response => {
                response.json().then(data => {
                    console.log("CON PROMESAS: ", data)
    
                    if (!response.ok) {
                        throw new Error('HTTP ' + response.status)
                    }
    
                    fetch(url_consulta) //Supongamos que ahora hago una petición con data
                        .then(response => {
                            response.json().then(data => {
                                console.log("CON PROMESAS: ", data)
    
                                if (!response.ok) {
                                    throw new Error('HTTP ' + response.status)
                                }
    
                            })
                        })
                })
            }) */


    if (!response.ok) {
        throw new Error('HTTP ' + response.status)
    }

    const data = await response.json()

    //console.log(data);

    return data;
}

formNombre.addEventListener('submit', async (event) => {
    event.preventDefault()
    const nombre = event.target.nombrePokemon;
    // console.log(nombre.value);
    const pokemonData = await obtenerPokemonPorNombre(nombre.value)

    console.log(pokemonData)

    salida.innerHTML = `
    <div class="card show">
        <img src=${pokemonData.sprites.front_default} alt="${pokemonData.name}">
        <h2>${pokemonData.name}</h2>
        <ul>
            <li>${pokemonData.abilities[0].ability.name}</li>
            <li>${pokemonData.abilities[1].ability.name}</li>
        </ul>
        <div class="types"> ${pokemonData.types[0].type.name}</div>
        <div class="types"> ${pokemonData.types[1].type.name}</div>
    </div>
    `
})