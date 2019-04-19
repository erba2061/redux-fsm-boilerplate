import { configureStore } from './store/configure'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Main from './components/Main'

const store = configureStore()

function mainRenderer () {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

ReactDOM.render(mainRenderer(), document.getElementById('app'))
