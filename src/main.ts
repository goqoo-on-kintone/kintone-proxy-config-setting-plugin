import { searchAddressByZipcode, validateZipcode } from './zipcode'

interface KintoneEvent {
  record: kintone.types.SavedFields
  error: string
}

kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], async (event: KintoneEvent) => {
  try {
    const record = event.record
    const zipcode = record.zipcode.value

    // 郵便番号の書式が正しいかをチェックする
    const isValid = validateZipcode(zipcode)
    if (!isValid) {
      record.zipcode.error = '郵便番号はハイフンなしの7桁の数字で指定してください。'
      return event
    }
    const addressList = await searchAddressByZipcode(zipcode)
    // 複数の住所候補が取得できる場合もあるが、サンプルなので最初の1件目を採用する
    record.address1.value = addressList?.[0]?.address1 || ''
    record.address2.value = addressList?.[0]?.address2 || ''
    record.address3.value = addressList?.[0]?.address3 || ''
    return event
  } catch (error) {
    event.error = error.message
    return event
  }
})
