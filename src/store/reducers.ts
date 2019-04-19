import { Reducer, combineReducers } from 'redux'
import actions, { Actions, DataResponseErrorPayload, DataRequestPayload, DataResponsePayload } from './actions'
import { DataFetcherState, dataFetcherState } from './state'

const INITIAL = dataFetcherState.init({
  data: [],
  selected: 0
})

function transitionDataRequest (currentState: DataFetcherState, payload: DataRequestPayload) {
  return dataFetcherState.match(currentState, {
    init: () => dataFetcherState.dataLoading({ ...currentState.payload }),
    dataLoading: () => dataFetcherState.dataLoading({ ...currentState.payload }),
    dataLoadingError: () => dataFetcherState.dataLoading({ ...currentState.payload }),
    default: () => dataFetcherState.init({ ...currentState.payload })
  })
}

function transitionDataResponse (currentState: DataFetcherState, payload: DataResponsePayload) {
  return dataFetcherState.match(currentState, {
    init: () => dataFetcherState.init({ data: payload.data, selected: currentState.payload.selected }),
    dataLoading: () => dataFetcherState.init({ data: payload.data, selected: currentState.payload.selected }),
    default: () => dataFetcherState.init({ ...currentState.payload })
  })
}

function transitionDataResponseError (currentState: DataFetcherState, payload: DataResponseErrorPayload) {
  return dataFetcherState.match(currentState, {
    init: () => dataFetcherState.dataLoadingError({ ...currentState.payload, error: payload.error }),
    dataLoading: () => dataFetcherState.dataLoadingError({ ...currentState.payload, error: payload.error }),
    default: () => dataFetcherState.dataLoadingError({ ...currentState.payload, error: payload.error })
  })
}

const dataFetcher: Reducer<DataFetcherState, Actions> = (currentState = INITIAL, action) => {
  return actions.match(action, {
    dataRequest: (payload) => transitionDataRequest(currentState, payload),
    dataResponse: (payload) => transitionDataResponse(currentState, payload),
    dataResponseError: (payload) => transitionDataResponseError(currentState, payload),
    default: () => dataFetcherState.init({ ...currentState.payload })
  })
}

const reducers = combineReducers({ dataFetcher })

export default reducers
