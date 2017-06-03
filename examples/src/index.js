import { pack } from '../../lib'
import components from './components'
import wrapper from './wrapper'

const run = pack(components)

const initialState = {
  endpoint: false
}

const modules = [
  {
    "component": "Markdown",
    "source": "### Instructions\nPlease be honest"
  },
  {
    "component": "Radio",
    "name": "candidate",
    "text": "Who's better?",
    "options": [
      "Hillary Clinton",
      "Donald Trump"
    ]
  },
  {
    "component": "Radio",
    "name": "bernie",
    "text": "You prefer ${candidate}?? What about Bernie?",
    "options": [
      "Love him",
      "Don't like him"
    ]
  }
]

const elementId = 'root'

run(initialState, modules, elementId, wrapper)
