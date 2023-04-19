import { Button, DatePicker, Dialog, Dropdown, MultiChoice } from 'kintone-ui-component'
;(async (PLUGIN_ID) => {
  // Create DatePicker component
  const datePicker = new DatePicker({
    label: 'Reference Date',
    requiredIcon: true,
    language: 'auto',
  })
  // Create Dropdown component
  const dropdown = new Dropdown({
    label: 'Condition',
    requiredIcon: true,
    items: [
      {
        label: '-----',
        value: '-----',
      },
      {
        label: 'Before reference date',
        value: 'before',
      },
      {
        label: 'After reference date',
        value: 'after',
      },
    ],
    value: '-----',
  })
  // Get field info to display in MultiChoice component
  const items = await getFields()
  // Create MultiChoice component
  const multiChoice = new MultiChoice({
    label: 'Fields',
    requiredIcon: true,
    items: items,
  })
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

  // Get field info of tha app
  function getFields() {
    const param = { app: kintone.app.getId() }
    return kintone.api(kintone.api.url('/k/v1/preview/app/form/fields', true), 'GET', param).then((resp) => {
      const items = []
      for (const key in resp.properties) {
        // eslint-disable-next-line
        if (!resp.properties.hasOwnProperty(key)) {
          continue
        }
        const prop = resp.properties[key]
        const label = prop.label
        const code = prop.code
        switch (prop.type) {
          case 'SINGLE_LINE_TEXT':
          case 'NUMBER':
          case 'CALC':
          case 'RADIO_BUTTON':
          case 'DROP_DOWN':
          case 'RECORD_NUMBER':
          case 'MULTI_LINE_TEXT':
          case 'CHECK_BOX':
          case 'MULTI_SELECT':
          case 'DATE':
          case 'DATETIME':
          case 'CREATED_TIME':
          case 'UPDATED_TIME':
            items.push({ label: label, value: code })
            break
          default:
            break
        }
      }
      return items
    })
  }

  // Display the value when saved last time
  const config = kintone.plugin.app.getConfig(PLUGIN_ID)
  if (Object.keys(config).length) {
    datePicker.value = config.date
    dropdown.value = config.condition
    multiChoice.value = JSON.parse(config.targetFields)
  }

  // Display components
  const dateSpaceEl = document.getElementById('date_space')!
  dateSpaceEl.appendChild(datePicker)
  const dropdownSpaceEl = document.getElementById('dropdown_space')!
  dropdownSpaceEl.appendChild(dropdown)
  const multiChoiceSpaceEl = document.getElementById('multichoice_space')!
  multiChoiceSpaceEl.appendChild(multiChoice)
  const buttonSpaceEl = document.getElementById('button_space')!
  buttonSpaceEl.appendChild(cancelButton)
  buttonSpaceEl.appendChild(saveButton)

  // When the Save button is clicked
  saveButton.addEventListener('click', (event) => {
    // Reset error messages
    datePicker.error = ''
    dropdown.error = ''
    multiChoice.error = ''
    // Check required itmes
    let requiredFlag = false
    if (!datePicker.value) {
      datePicker.error = 'Please enter'
      requiredFlag = true
    }
    if (dropdown.value === '-----') {
      dropdown.error = 'Please select'
      requiredFlag = true
    }
    if (!multiChoice.value.length) {
      multiChoice.error = 'Please select'
      requiredFlag = true
    }
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
    const selectedFields = JSON.stringify(multiChoice.value)
    const date = datePicker.value
    const condition = dropdown.value
    const config = {
      date: date,
      condition: condition,
      targetFields: selectedFields,
    }
    kintone.plugin.app.setConfig(config)
  })
  // When the Cancel button in Dialog is clicked
  dialogCancelButton.addEventListener('click', (event) => {
    dialog.close()
  })
})(kintone.$PLUGIN_ID)
