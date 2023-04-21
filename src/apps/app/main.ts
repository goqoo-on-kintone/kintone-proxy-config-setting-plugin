const PLUGIN_ID = kintone.$PLUGIN_ID

kintone.events.on(['app.record.detail.show', 'mobile.app.record.detail.show'], (event) => {
  const CONFIG = kintone.plugin.app.getConfig(PLUGIN_ID)
  console.info(CONFIG)
})
