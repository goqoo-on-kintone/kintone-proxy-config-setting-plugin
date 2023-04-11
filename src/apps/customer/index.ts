interface KintoneEvent {
  records: kintone.types.SavedFields[]
  error: string
}

kintone.events.on('app.record.index.show', async (event: KintoneEvent) => {
  console.log(event.records)
})
