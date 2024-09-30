const API_KEY = "89a72a677fba44b25b892e8e948a45fa";

window.onload = function () {
  var startPos;


  var geoSuccess = function (position) {
    startPos = position;

    const lat = (startPos.coords.latitude);
    const lon = (startPos.coords.longitude);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    )
      .then((data) => data.json())

    // const jsonData = get.json();
      .then((jsonData) => {
        fetch(
          `https://openweathermap.org/img/wn/${jsonData.weather[0].icon}@2x.png`
        )
          .then((res) => res.blob())
          .then((result) => {
            document.getElementById("text-location").innerHTML = jsonData.name;


            console.log(jsonData);

            document.getElementById("text-location-country").innerHTML =
              jsonData.sys.country;

            document.getElementById("text-temp").innerHTML = Math.round(
              jsonData.main.temp
            );
            document.getElementById("text-feels-like").innerHTML = jsonData.main.feels_like;

            document.getElementById("text_desc").innerHTML =
              jsonData.weather[0].description;

            const imageObjectURL = URL.createObjectURL(result);
            document.getElementById("icon").src = imageObjectURL;
          });
      });
  };

  navigator.geolocation.getCurrentPosition(geoSuccess);
}
