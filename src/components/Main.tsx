import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { DataFetcherState, dataFetcherState } from '../store/state'
import Actions from '../store/actions'

type MainProps = {
  state: DataFetcherState
  dispatch: Dispatch
}

const Main: React.FunctionComponent<MainProps> = (props) => {
  const { dispatch, state } = props

  function initState () {
    return (<>
      <button onClick={() => dispatch(Actions.dataRequest())}>dataRequest</button>
    </>)
  }

  function dataLoadingState () {
    return (<>
      <button onClick={() => dispatch(Actions.dataResponse({ data: [1, 2, 3] }))}>dataResponse</button>
      <button onClick={() => dispatch(Actions.dataResponseError({ error: 'Fetching numbers failed' }))}>dataResponseError</button>
    </>)
  }

  function dataLoadingErrorState () {
    return (<>
      <button onClick={() => dispatch(Actions.dataRequest())}>Retry</button>
    </>)
  }

  function deadState () {
    return (
      <i>dead state</i>
    )
  }

  return (
    <div>
      <header>
        <h1>Finite State Machine with Redux</h1>
        <div style={gridStyle()}>
          <div style={actionsStyle()}>
            <h3>Actions</h3>
            {dataFetcherState.match(state, {
              init: initState,
              dataLoading: dataLoadingState,
              dataLoadingError: dataLoadingErrorState,
              default: deadState
            })}
          </div>
          <div>
            <h3>State</h3>
            <span>{state.state}</span>
            <h3>Context</h3>
            <code>{JSON.stringify(state.payload.data, null, 2)}</code>
          </div>
        </div>
      </header>
    </div>
  )
}

function gridStyle () {
  return {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gridColumnGap: '80px'
  }
}

function actionsStyle () {
  return {
    display: 'flex',
    flexDirection: 'column'
  }
}

function mapStateToProps ({ dataFetcher }: { dataFetcher: DataFetcherState }) {
  return {
    state: dataFetcher
  }
}

function mapDispatchToProps (dispatch: Dispatch) {
  return {
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)