import '@logseq/libs';
import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin';

const settingsSchema: SettingSchemaDesc[] = [
    {
        key: "openWeatherCity",
        type: "string",
        default: "Kodaikanal,IN",
        title: "OpenWeather City",
        description: "Name of city followed by comma and two-letter country code. Example: Kodaikanal,IN",
    },
    {
        key: "openWeatherUnits",
        type: "string",
        default: "metric",
        title: "OpenWeather Units of measurement",
        description: "Choose between: standard (°K), metric (°C), imperial (°F). Example: metric",
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

const weatherUnits = {
    default: { temperature: "°K", distance: "m", speed: "m/s", pressure: "hPa" },
    metric: { temperature: "°C", distance: "m", speed: "m/s", pressure: "hPa" },
    imperial: { temperature: "°F", distance: "m", speed: "mph", pressure: "hPa" },
}

function settings_are_valid() {
    const city = logseq.settings!["openWeatherCity"]
    const units = logseq.settings!["openWeatherUnits"]
    const api_key = logseq.settings!["openWeatherAPIKey"]

    if (!api_key) {
        console.error("Need API key set in settings.")
        logseq.UI.showMsg(
            "Need OpenWeather API key. Add one in plugin settings.",
            "error"
        )
        return false
    }

    if (!city) {
        console.error("City not configured for OpenWeather plugin.")
        logseq.UI.showMsg(
            "Configure your city in plugin settings.",
            "error"
        )
        return false
    }

    if (!units) {
        console.error("Units of measurement not configured")
        logseq.UI.showMsg(
            "Configure units of measurement in plugin settings.",
            "error"
        )
        return false
    }

    if (!(units in weatherUnits)) {
        console.error("Units of measurement misconfigured")
        logseq.UI.showMsg(
            "Configure units of measurement in plugin settings.",
            "error"
        )
        return false
    }

    return true
}

async function fetch_current_weather(city, units) {
    const api_key = logseq.settings!["openWeatherAPIKey"]
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${api_key}`
    return await fetch(url).then(r => r.json())
}

async function weather_as_properties() {
    const city = logseq.settings!["openWeatherCity"]
    const units = logseq.settings!["openWeatherUnits"]

    const ud = weatherUnits[units]["distance"]
    const up = weatherUnits[units]["pressure"]
    const us = weatherUnits[units]["speed"]
    const ut = weatherUnits[units]["temperature"]
    
    let w = await fetch_current_weather(city, units)

    let weather_status = `#Weather at #[[${city}]]: ${w.weather[0].main}\n\
description:: ${w.weather[0].description}\n\
temperature:: ${w.main.temp} ${ut}\n\
feels_like:: ${w.main.feels_like} ${ut}\n\
temperature:: ${w.main.humidity}%\n\
sea_level:: ${w.main.sea_level} ${up}\n\
ground_level:: ${w.main.grnd_level} ${up}\n\
wind_speed:: ${w.wind.speed} ${us}\n\
wind_gust:: ${w.wind.gust} ${us}\n\
wind_direction:: ${w.wind.deg} °\n\
visibility:: ${w.visibility} ${ud}\n\
cloud_cover:: ${w.clouds.all}%\n\
`
    return weather_status
}

async function weather_as_description() {
    const city = logseq.settings!["openWeatherCity"]
    const units = logseq.settings!["openWeatherUnits"]

    const ud = weatherUnits[units]["distance"]
    const up = weatherUnits[units]["pressure"]
    const us = weatherUnits[units]["speed"]
    const ut = weatherUnits[units]["temperature"]

    let w = await fetch_current_weather(city, units)
    let weather_status = `#Weather at #[[${city}]]: \
${w.weather[0].main} (${w.weather[0].description}), \
temperature is ${w.main.temp} ${ut}, \
wind speed is ${w.wind.speed} ${us}, \
and clouds cover ${w.clouds.all}% of the sky.`
    return weather_status
}

function main() {
    logseq.useSettingsSchema(settingsSchema);

    logseq.Editor.registerSlashCommand(
        'OpenWeatherDescribe',
        async () => {
            if (!settings_are_valid()) {
                return
            }
            let weather_status = await weather_as_description()
            await logseq.Editor.insertAtEditingCursor(weather_status)
        },
    )
    logseq.Editor.registerSlashCommand(
        'OpenWeatherProperties',
        async () => {
            if (!settings_are_valid()) {
                return
            }
            let weather_status = await weather_as_properties()
            await logseq.Editor.insertAtEditingCursor(weather_status)
        },
    )

    console.info("logseq-openweather-plugin loaded")
}

logseq.ready(main).catch(console.error)
