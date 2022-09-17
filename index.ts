import '@logseq/libs';
import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin';

const weatherUnits = {
    metric: { temperature: "°C", distance: "km", speed: "km/h", pressure: "hPa" },
    imperial: { temperature: "°F", distance: "miles", speed: "mph", pressure: "hPa" },
}

const weatherIcons = {
    Atmosphere: "🌫",
    Drizzle: "🌦",
    Clear: "🔆",
    Clouds: "☁️",
    Rain: "🌧",
    Snow: "❄️",
    Thunderstorm: "⛈",
}

const settingsSchema: SettingSchemaDesc[] = [
    {
        key: "openWeatherCity",
        type: "string",
        default: "Kodaikanal,IN",
        title: "City",
        description: "Name of city followed by comma and two-letter country code. Example: Kodaikanal,IN",
    },
    {
        key: "openWeatherUnits",
        type: "string",
        default: "metric",
        title: "Units of measurement",
        description: "Choose between: metric (°C), imperial (°F). Example: metric",
    },
    {
        key: "openWeatherAPIKey",
        type: "string",
        default: "",
        title: "OpenWeather API Key",
        description:
            "Get yours at https://home.openweathermap.org/api_keys",
    },
]

function settings_are_valid() {
    const city = logseq.settings!["openWeatherCity"]
    const units = logseq.settings!["openWeatherUnits"]
    const api_key = logseq.settings!["openWeatherAPIKey"]

    if (!api_key) {
        console.error("API key not configured for OpenWeather plugin.")
        logseq.UI.showMsg(
            "Configure OpenWeather API key plugin settings.",
            "error"
        )
        return false
    }
    if (!city) {
        console.error("City not configured for OpenWeather plugin.")
        logseq.UI.showMsg(
            "Configure city in OpenWeather plugin settings.",
            "error"
        )
        return false
    }
    if (!units) {
        console.error("Units of measurement not configured for OpenWeather plugin.")
        logseq.UI.showMsg(
            "Configure units of measurement in OpenWeather plugin settings.",
            "error"
        )
        return false
    }
    if (!(units in weatherUnits)) {
        console.error("Units of measurement misconfigured")
        logseq.UI.showMsg(
            "Check configuration for units of measurement in OpenWeather plugin settings.",
            "error"
        )
        return false
    }

    return true
}

function icon_from_status(status) {
    return weatherIcons[status]
}

function capitalize_first_word(description: string) {
    return description.charAt(0).toUpperCase() + description.slice(1);
}

async function fetch_current_weather() {
    const city = logseq.settings!["openWeatherCity"]
    const units = logseq.settings!["openWeatherUnits"]
    const api_key = logseq.settings!["openWeatherAPIKey"]
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${api_key}`
    let w = await fetch(url).then(r => r.json())
    var weather: object

    if (units == "metric") {
        weather = {
            icon: icon_from_status(w.weather[0].main),
            status: w.weather[0].main,
            description: capitalize_first_word(w.weather[0].description),
            temperature: w.main.temp,
            feels_like: w.main.feels_like,
            humidity: w.main.humidity,
            pressure: w.main.pressure,
            wind_speed: (w.wind.speed * 3.6).toFixed(2),
            wind_gust: (w.wind.gust * 3.6).toFixed(2),
            wind_direction: w.wind.deg,
            visibility: (w.visibility / 1000).toFixed(2),
            cloud_cover: w.clouds.all,
            unit_temperature: weatherUnits[units]["temperature"],
            unit_distance: weatherUnits[units]["distance"],
            unit_speed: weatherUnits[units]["speed"],
            unit_pressure: weatherUnits[units]["pressure"],
        }
    } else {
        weather = {
            icon: icon_from_status(w.weather[0].main),
            status: w.weather[0].main,
            description: capitalize_first_word(w.weather[0].description),
            temperature: w.main.temp,
            feels_like: w.main.feels_like,
            humidity: w.main.humidity,
            pressure: w.main.pressure,
            wind_speed: w.wind.speed,
            wind_gust: w.wind.gust,
            wind_direction: w.wind.deg,
            visibility: (w.visibility / 1609.34).toFixed(2),
            cloud_cover: w.clouds.all,
            unit_temperature: weatherUnits[units]["temperature"],
            unit_distance: weatherUnits[units]["distance"],
            unit_speed: weatherUnits[units]["speed"],
            unit_pressure: weatherUnits[units]["pressure"],
        }
    }
    return weather
}

function main() {
    logseq.useSettingsSchema(settingsSchema);

    logseq.Editor.registerSlashCommand(
        'OpenWeather',
        async () => {
            if (settings_are_valid()) {
                const w = await fetch_current_weather()
                await logseq.Editor.insertAtEditingCursor(`${w["icon"]} ${w["temperature"]} ${w["unit_temperature"]}`)
            }
        },
    )
    logseq.Editor.registerSlashCommand(
        'OpenWeatherShort',
        async () => {
            if (settings_are_valid()) {
                const w = await fetch_current_weather()
                await logseq.Editor.insertAtEditingCursor(`${w["icon"]} ${w["status"]}, ${w["temperature"]} ${w["unit_temperature"]}`)
            }
        },
    )
    logseq.Editor.registerSlashCommand(
        'OpenWeatherLong',
        async () => {
            if (settings_are_valid()) {
                const w = await fetch_current_weather()
                await logseq.Editor.insertAtEditingCursor(`${w["icon"]} ${w["description"]}, 🌡 ${w["temperature"]} ${w["unit_temperature"]}, 💧 ${w["humidity"]}%, 💨 ${w["wind_speed"]} ${w["unit_speed"]}`)
            }
        },
    )
    logseq.Editor.registerSlashCommand(
        'OpenWeatherDescribe',
        async () => {
            if (settings_are_valid()) {
                const w = await fetch_current_weather()
                await logseq.Editor.insertAtEditingCursor(`${w["description"]} with temperature at ${w["temperature"]} ${w["unit_temperature"]}, humidity is ${w["humidity"]}% and wind speed is ${w["wind_speed"]} ${w["unit_speed"]}.`)
            }
        },
    )
    logseq.Editor.registerSlashCommand(
        'OpenWeatherProperties',
        async () => {
            if (settings_are_valid()) {
                const w = await fetch_current_weather()
                const properties = `\
${w["description"]} \n\
icon:: ${w["icon"]} \n\
status:: ${w["status"]} \n\
description:: ${w["description"]} \n\
temperature:: ${w["temperature"]} \n\
feels_like:: ${w["feels_like"]} \n\
humidity:: ${w["humidity"]} \n\
pressure:: ${w["pressure"]} \n\
wind_speed:: ${w["wind_speed"]} \n\
wind_gust:: ${w["wind_gust"]} \n\
wind_direction:: ${w["wind_direction"]} \n\
visibility:: ${w["visibility"]} \n\
cloud_cover:: ${w["cloud_cover"]} \n\
unit_temperature:: ${w["unit_temperature"]} \n\
unit_distance:: ${w["unit_distance"]} \n\
unit_speed:: ${w["unit_speed"]} \n\
unit_pressure:: ${w["unit_pressure"]} \n\
`
                await logseq.Editor.insertAtEditingCursor(properties)
            }
        },
    )

    console.info("logseq-openweather-plugin loaded")
}

logseq.ready(main).catch(console.error)
