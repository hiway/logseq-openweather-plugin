# logseq-openweather-plugin

Logseq plugin to access weather data from OpenWeather API

---

### Install

```console
git pull https://github.com/hiway/logseq-openweather-plugin.git
logseq-openweather-plugin
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

Units of measurement (metric / imperial).

#### metric

**default**

- temperature: °C
- pressure: hPa
- distance: kilometers
- speed: kilometers/hour

#### imperial

- temperature: °F
- pressure: hPa
- distance: miles
- speed: miles/hour

#### OpenWeather API Key

OpenWeather API requires you to register to get an API key, this key is required for the plugin to function. 

- Register and/or login: https://openweathermap.org/
- Once logged in, visit: https://home.openweathermap.org/api_keys
- Generate a new API key with a name, for example "MyLogseq"
- Copy-paste the API key: `Logseq > Plugins > OpenWeather > ⚙️ > Open Settings > OpenWeather API Key`

---

### Commands

#### `/OpenWeather`

```
☁️ 13.53 °C
```

#### `/OpenWeatherShort`

```
☁️ Clouds, 13.53 °C
```

#### `/OpenWeatherLong`

```
☁️ Overcast clouds, 🌡 13.53 °C, 💧 84%, 💨 4.25 km/h
```

#### `/OpenWeatherDescribe`

Describes current weather in a single line.

Example: 
```
#Weather at #[[Kodaikanal,IN]]: Overcast clouds with temperature at 13.53 °C, humidity is 84% and wind speed is 4.25 km/h.
```

#### `/OpenWeatherProperties`

Adds current weather data as properties.

Example:
```
#Weather at #[[Kodaikanal,IN]]: Overcast clouds 
icon:: ☁️ 
status:: Clouds 
description:: Overcast clouds 
temperature:: 13.53 
feels_like:: 13.13 
humidity:: 84 
pressure:: 1012 
wind_speed:: 4.25 
wind_gust:: 4.82 
wind_direction:: 284 
visibility:: 10.00 
cloud_cover:: 100 
unit_temperature:: °C 
unit_distance:: km 
unit_speed:: km/h 
unit_pressure:: hPa 
```

### Discussion

https://discuss.logseq.com/t/plugin-to-pull-current-weather-from-openweather-api/10858
