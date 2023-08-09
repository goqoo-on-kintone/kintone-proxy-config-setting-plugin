import { goqoo } from 'goqoo'
import { entryName } from 'utils/entryName'

goqoo(entryName('config'), () => {
  require('./config.css')
  require('./main')
})
