const weather = document.querySelector(".js-weather");

const API_KEY = "1175c4cb77b6f212739589e0f97c3690";
const COORDS = 'coords';

function getWeather(lat, lon) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response) {
//		console.log(response);
		return response.json();
	}).then(function(json) {
//		console.log(json)
		const temperature = json.main.temp;
		const place = json.name;
		weather.innerText = `${temperature} @ ${place}`;
	});
}  // parameter units 변경 but lang=kr 안됨! NOTE: Translation is only applied for the "description" field.
// then: data를 (완전히) 불러온 다음에 함수 실행

function saveCoords(coordsObj) {
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
//	console.log(position);
	const latitude = position.coords.latitude,
		longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
//		자동으로 아래와 같은 형식으로 되네..?
//		latitude : latitude,
//		longitude : longitude
	};
	
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleGeoError() {
	console.log("Can't access geo location");
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
	const loadedCords = localStorage.getItem(COORDS);
	if (loadedCords === null) {
		askForCoords();
	} else {
		// getWeather
		const parseCoords = JSON.parse(loadedCords);
//		console.log(parseCoords);
		getWeather(parseCoords.latitude, parseCoords.longitude);
	}
}

function init() {
	loadCoords();
}

init();