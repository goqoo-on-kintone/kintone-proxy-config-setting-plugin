import { Button, Dialog, Dropdown, Table } from 'kintone-ui-component'
// @ts-expect-error
import INNER_HTML from './config-inner.html'

document.querySelector<HTMLElement>('section.settings')!.innerHTML = INNER_HTML

const PLUGIN_ID = kintone.$PLUGIN_ID

const renderAge = (dataCell: string) => {
  const spanElement = document.createElement('span')
  spanElement.innerText = `The age is ${dataCell}`
  return spanElement
}

const renderName = (cellData: string) => {
  const dropdown = new Dropdown({
    items: [
      { label: 'GET', value: 'GET' },
      { label: 'POST', value: 'POST' },
      { label: 'PUT', value: 'PUT' },
      { label: 'DELETE', value: 'DELETE' },
    ],
    value: cellData,
  })
  return dropdown
}

const table = new Table({
  columns: [
    {
      title: 'Method',
      field: 'method',
      render: renderName,
    },
    {
      title: 'Address',
      field: 'address',
    },
    {
      title: 'Age',
      field: 'age',
      render: renderAge,
    },
  ],
  data: [
    {
      name: 'john',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      name: 'steven',
      age: 22,
      address: 'New York No. 2 Lake Park',
    },
  ],
  className: 'options-class',
  id: 'options-id',
  actionButton: true,
  visible: true,
})

// space.appendChild(table)

table.addEventListener('change', (event) => {
  console.info(event)
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
              <p style="margin: 0;">The target fields are colored according to the conditions.</p>
              <p>Are you sure to save your settings?</p>
              <div>`,
  footer: divEl,
})

// Display the value when saved last time
const config = kintone.plugin.app.getConfig(PLUGIN_ID)
if (Object.keys(config).length) {
  // TODO: 保存対象データを設定
  // datePicker.value = config.date
  // dropdown.value = config.condition
}

// Display components
const dateSpaceEl = document.querySelector<HTMLDivElement>('#table-space')!
dateSpaceEl.appendChild(table)
const buttonSpaceEl = document.querySelector<HTMLButtonElement>('#button-space')!
buttonSpaceEl.appendChild(cancelButton)
buttonSpaceEl.appendChild(saveButton)

// When the Save button is clicked
saveButton.addEventListener('click', (event) => {
  // TODO: 保存対象データを設定
  // // Reset error messages
  // datePicker.error = ''
  // dropdown.error = ''
  // Check required itmes
  const requiredFlag = false
  // if (!datePicker.value) {
  //   datePicker.error = 'Please enter'
  //   requiredFlag = true
  // }
  // if (dropdown.value === '-----') {
  //   dropdown.error = 'Please select'
  //   requiredFlag = true
  // }
  if (requiredFlag) return
  dialog.open()
  divEl.appendChild(dialogCancelButton)
  divEl.appendChild(dialogOKButton)
})
// When the Cancel button is clicked
cancelButton.addEventListener('click', (event) => {
  history.back()
})

// When the OK button in Dialog is clicked
dialogOKButton.addEventListener('click', (event) => {
  // const date = datePicker.value
  // const condition = dropdown.value
  const config = {
    // date: date,
    // condition: condition,
  }
  kintone.plugin.app.setConfig(config)
})
// When the Cancel button in Dialog is clicked
dialogCancelButton.addEventListener('click', (event) => {
  dialog.close()
})
