const UNDEFINED = '___undefined___'
// eslint-disable-next-line
type ConfigReplacer = (_: any, v: any) => any
type ConfigReviver = ConfigReplacer

// eslint-disable-next-line
const defaultConfigReplacer = (_: any, v: any) => (v === undefined ? UNDEFINED : v)

export const saveConfig = <T>(config: T, replacer = defaultConfigReplacer): void => {
  // プラグイン保存容量には上限がある（256KB）ので、schema を id, var, type に絞って容量を節約
  type FieldList = { [key: string]: cybozu.data.page.FORM_DATA.Field }
  const reduceFieldList = (fieldList: FieldList): FieldList =>
    Object.entries(fieldList).reduce(
      (acc, [key, { id, var: code, type }]) => ({
        ...acc,
        [key]: { id, var: code, type },
      }),
      {}
    )
  const reducedSchema: cybozu.data.page.FORM_DATA.Schema = {
    table: {
      ...cybozu.data.page.FORM_DATA.schema.table,
      fieldList: reduceFieldList(cybozu.data.page.FORM_DATA.schema.table.fieldList),
    },
    subTable: Object.entries(cybozu.data.page.FORM_DATA.schema.subTable).reduce(
      (acc, [key, { fieldList }]) => ({
        ...acc,
        [key]: { fieldList: reduceFieldList(fieldList) },
      }),
      {}
    ),
  }
  kintone.plugin.app.setConfig({
    root: serializeConfig(config, replacer),
    schema: serializeConfig(reducedSchema, defaultConfigReplacer),
  })
}

const serializeConfig = <T>(config: T, replacer: ConfigReplacer): string => JSON.stringify(config, replacer)

// eslint-disable-next-line
const defaultConfigReviver = (k: any, v: any) => (v === UNDEFINED ? undefined : v)

export const loadConfig = <T>(pluginId: string, reviver = defaultConfigReviver): T | undefined => {
  const { root }: { root: string | undefined } = kintone.plugin.app.getConfig(pluginId)
  return root ? deserializeConfig<T>(root, reviver) : undefined
}

const deserializeConfig = <T>(serializedConfig: string, reviver: ConfigReviver): T =>
  JSON.parse(serializedConfig, reviver)
