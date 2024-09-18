let timeout;
const apiKey = '3d1592aab70e4a19a9e151411241709'; // Substitua pela sua chave da Weather API

document.getElementById('inp_localizacao').addEventListener('input', function () {
    clearTimeout(timeout); // Evitar múltiplas requisições

    const query = this.value;
    if (query.length >= 2) { // Espera até que o usuário tenha digitado 2 caracteres
        timeout = setTimeout(() => {
            fetchSuggestions(query);
        }, 500); // Debounce de 500ms
    }
});

function fetchSuggestions(query) {
    const apiUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displaySuggestions(data);
        })
        .catch(error => console.error('Erro ao buscar sugestões:', error));
}

function displaySuggestions(locations) {
    const suggestionsList = document.getElementById('suggestions');
    suggestionsList.innerHTML = ''; // Limpa as sugestões anteriores

    locations.forEach(location => {
        const li = document.createElement('li');
        li.textContent = `${location.name}, ${location.region}, ${location.country}`;
        li.addEventListener('click', function () {
            // Preencher o campo de input com o nome da cidade selecionada
            document.getElementById('inp_localizacao').value = location.name;
            suggestionsList.innerHTML = ''; // Limpa as sugestões após selecionar
            // Aqui você pode chamar a função que busca os dados climáticos da cidade selecionada
            localizar(location.name);
        });
        suggestionsList.appendChild(li);
    });
}

function localizar(cidade) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}&aqi=no`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.location) {
                const country = data.location.country;
                const lat = data.location.lat;
                const lon = data.location.lon;
                const nome = data.location.name;
                const temp = data.current.temp_c;
                const condition = data.current.condition.text;
                const conditionIcon = data.current.condition.icon;

                document.getElementById("result_nome").textContent = `${nome} - ${country}`;
                document.getElementById("result_temp").textContent = `Temperatura: ${temp}°C`;
                document.getElementById("result_lat").textContent = `Latitude: ${lat}`;
                document.getElementById("result_lon").textContent = `Longitude: ${lon}`;
                document.getElementById("result_condicao").textContent = `Condição: ${condition}`;

                const weatherIcon = document.getElementById("condicao");

                switch (condition) {
                    case "Sunny":
                    case "Clear":
                        weatherIcon.src = "css/sun.svg";
                        break;

                    case "Rain":
                    case "Drizzle":
                        weatherIcon.src = "css/rain.svg";
                        break;

                    case "Thunderstorm":
                        weatherIcon.src = "css/thunderstorm.svg";
                        break;

                    case "Snow":
                        weatherIcon.src = "css/snow.svg";
                        break;

                    case "Cloudy":
                    case "Overcast":
                        weatherIcon.src = "css/cloud.svg";
                        break;

                    case "Mist":
                    case "Haze":
                    case "Partly cloudy":
                        weatherIcon.src = "css/mist.svg";
                        break;

                    default:
                        weatherIcon.src = ""; // Não mostra ícone se não houver condição definida
                        break;
                }


            } else {
                console.log('Localização não encontrada.');
            }
        })
        .catch(error => console.error('Erro ao buscar os dados climáticos:', error));
}
