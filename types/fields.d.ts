declare namespace kintone.types {
  interface Fields {
    都道府県: kintone.fieldTypes.SingleLineText;
    郵便番号: kintone.fieldTypes.SingleLineText;
    市区町村名: kintone.fieldTypes.SingleLineText;
    町域名: kintone.fieldTypes.SingleLineText;
  }
  interface SavedFields extends Fields {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
