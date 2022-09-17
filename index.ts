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


function main() {
    logseq.useSettingsSchema(settingsSchema);

    logseq.Editor.registerSlashCommand(
        'OpenWeatherDescribe',
        async () => {
            await logseq.Editor.insertAtEditingCursor("Describes current weather in a single line.")
        },
    )
    logseq.Editor.registerSlashCommand(
        'OpenWeatherProperties',
        async () => {
            await logseq.Editor.insertAtEditingCursor("Adds current weather as properties.")
        },
    )
}

logseq.ready(main).catch(console.error)
