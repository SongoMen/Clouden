import { createStore, applyMiddleware, compose } from 'redux'
import promise from 'redux-promise'
import reducers from './reducers'

const finalCreateStore = compose(
    applyMiddleware(promise),
    window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)

const store = finalCreateStore(reducers)


//const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store