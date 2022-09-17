import '@logseq/libs';
import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin';

const weatherUnits = {
    metric: { temperature: "°C", distance: "km", speed: "km/h", pressure: "hPa" },
    imperial: { temperature: "°F", distance: "meters", speed: "mph", pressure: "hPa" },
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

function main() {
    logseq.useSettingsSchema(settingsSchema);

    logseq.Editor.registerSlashCommand(
        'OpenWeather',
        async () => {
            if (settings_are_valid()) {
                await logseq.Editor.insertAtEditingCursor("OpenWeather")
            }
        },
    )
    logseq.Editor.registerSlashCommand(
        'OpenWeatherShort',
        async () => {
            if (settings_are_valid()) {
                await logseq.Editor.insertAtEditingCursor("OpenWeatherShort")
            }
        },
    )
    logseq.Editor.registerSlashCommand(
        'OpenWeatherLong',
        async () => {
            if (settings_are_valid()) {
                await logseq.Editor.insertAtEditingCursor("OpenWeatherLong")
            }
        },
    )
    logseq.Editor.registerSlashCommand(
        'OpenWeatherDescribe',
        async () => {
            if (settings_are_valid()) {
                await logseq.Editor.insertAtEditingCursor("OpenWeatherDescribe")
            }
        },
    )
    logseq.Editor.registerSlashCommand(
        'OpenWeatherProperties',
        async () => {
            if (settings_are_valid()) {
                await logseq.Editor.insertAtEditingCursor("OpenWeatherProperties")
            }
        },
    )

    console.info("logseq-openweather-plugin loaded")
}

logseq.ready(main).catch(console.error)
