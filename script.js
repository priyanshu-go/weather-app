let weather = {
    apiKey: "8f6288c5ebf8353c54ba56b5d84e28f0",
    fetchWeather: function (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Weather data not found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data))
        .catch((error) => {
          console.error("Error fetching weather:", error);
          alert("Error fetching weather. Please try again.");
        });
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      const searchInput = document.querySelector(".search-bar").value;
      if (searchInput) {
        this.fetchWeather(searchInput);
      } else {
        alert("Please enter a city name.");
      }
    },
  };
  
  document.querySelector(".search-container button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        weather.search();
      }
    });
  
  // Initial weather fetch for a default city (kuwait in this case)
  weather.fetchWeather("kuwait");