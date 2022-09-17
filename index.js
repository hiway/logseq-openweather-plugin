function main() {
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
