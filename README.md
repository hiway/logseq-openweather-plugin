# logseq-plugin-openweather

Logseq plugin to access weather data from OpenWeather API

---

### Install

```console
git pull https://github.com/hiway/logseq-plugin-openweather.git
logseq-plugin-openweather
yarn
yarn build
```

Enable developer mode: `Logseq > Settings > Advanced > Developer mode`

Import plugin: `Logseq > Plugins > Load unpacked plugin` and point to the cloned repo.

---

### Settings

#### City

Name of the city, followed by a comma, followed by two-letter country code. No space.

Example:
```
Kodaikanal,IN
```

#### Units

Units of measurement (standard / metric / imperial).

#### standard

- temperature: °K
- pressure: hPa
- distance: meters
- speed: meters/second

#### metric

**default**

- temperature: °C
- pressure: hPa
- distance: kilometers
- speed: kilometers/hour

#### imperial

- temperature: °F
- pressure: hPa
- distance: meters
- speed: miles/hour

#### OpenWeather API Key

OpenWeather API requires you to register to get an API key, this key is required for the plugin to function. 

- Register and/or login: https://openweathermap.org/
- Once logged in, visit: https://home.openweathermap.org/api_keys
- Generate a new API key with a name, for example "MyLogseq"
- Copy-paste the API key: `Logseq > Plugins > OpenWeather > ⚙️ > Open Settings > OpenWeather API Key`

---

### Commands

#### `/OpenWeatherDescribe`

Describes current weather in a single line.

Example: 
```
#Weather at #[[Kodaikanal,IN]]: Clouds (overcast clouds), temperature is 16.05 °C, wind speed is 3.20 km/h, and clouds cover 100% of the sky.
```

#### `/OpenWeatherProperties`

Adds current weather data as properties.

Example:
```
#Weather at #[[Kodaikanal,IN]]: Clouds
description:: overcast clouds
temperature:: 16.05 °C
feels_like:: 15.8 °C
humidity:: 80%
pressure:: 1010 hPa
wind_speed:: 3.20 km/h
wind_gust:: 9.50 km/h
wind_direction:: 49°
visibility:: 10.00 km
cloud_cover:: 100%
```
