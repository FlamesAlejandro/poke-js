// barra de busqueda que ejecuta la API
document.getElementById('pokemonSearchInput').addEventListener('keyup', function (event) {
    // Verificar si la tecla presionada fue "Enter"
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevenir cualquier acción por defecto

        const pokemonName = this.value.toLowerCase(); // Convertir a minúsculas para la búsqueda
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon no encontrado');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Aquí manejas los datos recibidos
                displayPokemonData(data); // Función para mostrar los datos en la página
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});

function displayPokemonData(pokemon) {
    // Aquí agregas la lógica para mostrar la información en tu página
    // Por ejemplo, mostrar el nombre y la imagen del Pokémon
    const resultsContainer = document.getElementById('pokemonResults');
    // Obtener los tipos del Pokémon
    let types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');

    resultsContainer.innerHTML = `
    <tr>
        <td>${pokemon.name}</td>
        <td>${types}</td>
        <td><img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></td>
    </tr>`;
}
