import { distinctUntilChanged, map, filter, flatMap, switchMap } from 'rxjs/operators'
import { Epic, combineEpics } from 'redux-observable'
import { State, dataFetcherState, DataFetcherState } from './state'
import actions, { Actions } from './actions'
import { getData } from '../api'
import { EMPTY, from } from 'rxjs'

const emptyResult = () => EMPTY

function dataFetcherScope (state: State) {
  return state.dataFetcher
}

function equalStates (x: DataFetcherState, y: DataFetcherState) {
  return x.state === y.state
}

function mapState (state: DataFetcherState) {
  function dataLoadingSideEffect () {
    return getData()
      .then(response => response.data)
      .then(actions.dataResponse)
  }

  return dataFetcherState.match(state, {
    dataLoading: () => from(dataLoadingSideEffect(), undefined),
    init: emptyResult,
    dataLoadingError: emptyResult,
    uiTriggeredDataLoading: emptyResult
  })
}

type DataFetcherEpic = Epic<Actions, Actions, State>
const dataFetcherEpic: DataFetcherEpic = (action$, state$) => {
  // Would be better to action$.pipe()...
  return state$.pipe(
    map(dataFetcherScope),
    distinctUntilChanged(equalStates),
    switchMap(mapState),
    filter(Boolean)
  )
}

export default combineEpics(dataFetcherEpic)