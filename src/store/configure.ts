import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Actions } from './actions'
import { State } from './state'
import epic from './epic'
import reducers from './reducers'

export const configureStore = () => {
  const epicMiddleware = createEpicMiddleware<Actions, Actions, State>()

  const store = createStore(
    reducers,
    composeWithDevTools({ maxAge: 300 })(
      applyMiddleware(epicMiddleware)
    )
  )

  epicMiddleware.run(epic)

  return store
}