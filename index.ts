import '@logseq/libs';
import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin';

const settingsSchema: SettingSchemaDesc[] = [
    {
        key: "openWeatherCity",
        type: "string",
        default: "Kodaikanal,IN",
        title: "OpenWeather City",
        description: "Name of your city followed by comma and two-letter country code.",
    },
    {
        key: "openWeatherUnits",
        type: "string",
        default: "metric",
        title: "OpenWeather Units of measurement",
        description: "Choose between: standard (°K), metric (°C), imperial (°F)",
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

function main() {
    logseq.useSettingsSchema(settingsSchema);

    logseq.Editor.registerSlashCommand(
        'OpenWeatherDescribe',
        async () => {
            if (!settings_are_valid()) {
                return
            }
            await logseq.Editor.insertAtEditingCursor("Describes current weather in a single line.")
        },
    )
    logseq.Editor.registerSlashCommand(
        'OpenWeatherProperties',
        async () => {
            if (!settings_are_valid()) {
                return
            }
            await logseq.Editor.insertAtEditingCursor("Adds current weather as properties.")
        },
    )

    console.info("logseq-openweather-plugin loaded")
}

logseq.ready(main).catch(console.error)
