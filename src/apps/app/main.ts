import { DateTime } from 'luxon'

const PLUGIN_ID = kintone.$PLUGIN_ID

kintone.events.on(['app.record.detail.show', 'mobile.app.record.detail.show'], (event) => {
  const CONFIG = kintone.plugin.app.getConfig(PLUGIN_ID)
  // Get today's date with yyyy-mm-dd
  const currentDate = DateTime.local().toISODate()!
  const referenceDate = CONFIG.date
  const condition = CONFIG.condition
  const targetFields = JSON.parse(CONFIG.targetFields) as string[]
  const fieldColor = '#e74c3c'
  let isBefore = false
  if (currentDate < referenceDate) {
    isBefore = true
  }
  // Change the fields' color to red depending on the conditions set in the plug-in
  if ((isBefore && condition === 'before') || (!isBefore && condition === 'after')) {
    targetFields.forEach((targetField) => {
      const fieldElement =
        kintone.app.record.getFieldElement(targetField) ?? kintone.mobile.app.record.getFieldElement(targetField)
      if (!fieldElement) return
      fieldElement.style.backgroundColor = fieldColor
    })
  }
})
