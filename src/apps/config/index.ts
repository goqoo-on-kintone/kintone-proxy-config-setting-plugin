;(function (PLUGIN_ID) {
  const $form = document.querySelector<HTMLFormElement>('.js-submit-settings')
  const $cancelButton = document.querySelector<HTMLButtonElement>('.js-cancel-button')
  const $message = document.querySelector<HTMLInputElement>('.js-text-message')
  if (!$form || !$cancelButton || !$message) {
    throw new Error('Required elements do not exist.')
  }
  const config = kintone.plugin.app.getConfig(PLUGIN_ID)

  if (config.message) {
    $message.value = config.message
  }
  $form.addEventListener('submit', function (e) {
    e.preventDefault()
    kintone.plugin.app.setConfig({ message: $message.value }, function () {
      alert('The plug-in settings have been saved. Please update the app!')
      window.location.href = '../../flow?app=' + kintone.app.getId()
    })
  })
  $cancelButton.addEventListener('click', function () {
    window.location.href = '../../' + kintone.app.getId() + '/plugin/'
  })
})(kintone.$PLUGIN_ID)
