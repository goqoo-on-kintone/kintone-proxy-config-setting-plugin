import { goqoo } from 'goqoo'
import { entryName } from 'utils/entryName'

goqoo(entryName('app'), () => {
  require('./main')
})
