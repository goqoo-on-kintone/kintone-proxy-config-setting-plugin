import { Button, Combobox, Dialog, Table, Text, TextArea } from 'kintone-ui-component'
// @ts-expect-error
import INNER_HTML from './config-inner.html'
import { loadProxyConfig, saveProxyConfig } from 'utils/proxyConfigUtils'
import { createInitialProxyConfig } from 'utils/configTypes'
import type { ProxyConfig } from 'utils/configTypes'

document.querySelector<HTMLElement>('section.settings')!.innerHTML = INNER_HTML

const { proxyConfigs } = loadProxyConfig(kintone.$PLUGIN_ID)

const renderUrl = (value: string) => {
  const text = new Text({
    value,
    className: 'url-input',
  })
  return text
}

const renderMethod = (value: string) => {
  const combobox = new Combobox({
    items: [
      { label: 'GET', value: 'GET' },
      { label: 'POST', value: 'POST' },
      { label: 'PUT', value: 'PUT' },
      { label: 'DELETE', value: 'DELETE' },
    ],
    value,
  })
  return combobox
}

const renderJson = (value: string) => {
  const text = new TextArea({
    value,
    placeholder: JSON.stringify({ key1: 'value1', key2: 'value2' }, null, 2),
  })
  return text
}

const table = new Table({
  columns: [
    {
      title: 'URL',
      field: 'url',
      render: renderUrl,
    },
    {
      title: 'Method',
      field: 'method',
      render: renderMethod,
    },
    {
      title: 'Headers',
      field: 'headers',
      render: renderJson,
    },
    {
      title: 'Data',
      field: 'data',
      render: renderJson,
    },
  ],
  data: proxyConfigs,
})

const removedProxyConfigs: ProxyConfig[] = []
type TableChangeDetail = {
  type: 'add-row' | 'remove-row'
  rowIndex: number
  data: ProxyConfig[]
  oldData: ProxyConfig[]
}
table.addEventListener('change', (event) => {
  // @ts-expect-error
  const detail = event.detail as TableChangeDetail
  if (detail.type === 'add-row') {
    const newData = detail.data
    newData[detail.rowIndex] = createInitialProxyConfig()
    table.data = newData
  }
  if (detail.type === 'remove-row') {
    const removedRow = detail.oldData[detail.rowIndex]
    removedProxyConfigs.push(removedRow)
  }
})

// Get field info to display in MultiChoice component
// Create MultiChoice component
// Create Button component
const saveButton = new Button({
  text: 'Save',
  type: 'submit',
})
const cancelButton = new Button({
  text: 'Cancel',
  type: 'normal',
  id: 'kuc_cancel_button',
})
const dialogOKButton = new Button({
  text: 'OK',
  type: 'submit',
})
const dialogCancelButton = new Button({
  text: 'Cancel',
  type: 'normal',
  id: 'kuc_dialog_cancel_button',
})
const divEl = document.createElement('div')
divEl.setAttribute('id', 'kuc_dialog_footer')
// Create Dialog component
const dialog = new Dialog({
  content: `<div style="text-align: center; padding: 48px 24px">
              <p>Are you sure to save your settings?</p>
              <div>`,
  footer: divEl,
})

// Display components
const dateSpaceEl = document.querySelector<HTMLDivElement>('#table-space')!
dateSpaceEl.appendChild(table)
const buttonSpaceEl = document.querySelector<HTMLButtonElement>('#button-space')!
buttonSpaceEl.appendChild(cancelButton)
buttonSpaceEl.appendChild(saveButton)

// When the Save button is clicked
saveButton.addEventListener('click', () => {
  dialog.open()
  divEl.appendChild(dialogCancelButton)
  divEl.appendChild(dialogOKButton)
})
// When the Cancel button is clicked
cancelButton.addEventListener('click', () => {
  history.back()
})

// When the OK button in Dialog is clicked
dialogOKButton.addEventListener('click', () => {
  saveProxyConfig({ proxyConfigs: table.data as ProxyConfig[] }, removedProxyConfigs)
})
// When the Cancel button in Dialog is clicked
dialogCancelButton.addEventListener('click', () => {
  dialog.close()
})
