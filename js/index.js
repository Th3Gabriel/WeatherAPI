
let country, lat, lon;

function localizar() {
    const cidade = document.getElementById('inp_localização').value;
    const apiKey = '3d1592aab70e4a19a9e151411241709';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}&aqi=no`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log('Weather Data:', data);
        if (data.location) {
            country = data.location.country;
            lat = data.location.lat;
            lon = data.location.lon;

            const nome = data.location.name;
            const temp = data.current.temp_c;
            const condition = data.current.condition.text;

            const resultNome = document.getElementById("result_nome");
            const resultPais = document.getElementById("result_pais");
            const resultTemp = document.getElementById("result_temp");
            const resultLat = document.getElementById("result_lat");
            const resultLon = document.getElementById("result_lon");
            const resultCondicao = document.getElementById("result_condicao");

            resultPais.textContent = `Pais:  ${country}`
            resultNome.textContent = `Nome:  ${nome}`
            resultLon.textContent = `Temperatura: ${temp}°C`
            resultTemp.textContent = `latitude:  ${lat}`
            resultLat.textContent = `longitude:  ${lon}`
            resultCondicao.textContent = `Condição: ${condition}`

        } else {
            console.log('Localização não encontrada.');
        }
    })
    .catch(error => console.error('Erro ao buscar os dados:', error));
}

const button = document.getElementById('btn_localizar');
button.addEventListener('click', localizar);
