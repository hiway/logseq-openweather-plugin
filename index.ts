import '@logseq/libs';
import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin';

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

function main() {
    logseq.useSettingsSchema(settingsSchema);

    logseq.Editor.registerSlashCommand(
        'OpenWeather',
        async () => {
            await logseq.Editor.insertAtEditingCursor("OpenWeather")
        },
    )
    logseq.Editor.registerSlashCommand(
        'OpenWeatherShort',
        async () => {
            await logseq.Editor.insertAtEditingCursor("OpenWeatherShort")
        },
    )
    logseq.Editor.registerSlashCommand(
        'OpenWeatherLong',
        async () => {
            await logseq.Editor.insertAtEditingCursor("OpenWeatherLong")
        },
    )
    logseq.Editor.registerSlashCommand(
        'OpenWeatherDescribe',
        async () => {
            await logseq.Editor.insertAtEditingCursor("OpenWeatherDescribe")
        },
    )
    logseq.Editor.registerSlashCommand(
        'OpenWeatherProperties',
        async () => {
            await logseq.Editor.insertAtEditingCursor("OpenWeatherProperties")
        },
    )

    console.info("logseq-openweather-plugin loaded")
}

logseq.ready(main).catch(console.error)
