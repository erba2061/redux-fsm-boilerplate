import { unionCreator, UnionTypes } from './helpers'
import { ofType } from 'unionize'

export type BasicContext = { data: string[], selected?: number }
export type ErrorContext = BasicContext & { error: string }

export const dataFetcherState = unionCreator(UnionTypes.STATE)({
  init: ofType<BasicContext>(),
  dataLoading: ofType<BasicContext>(),
  uiTriggeredDataLoading: ofType<BasicContext>(),
  dataLoadingError: ofType<ErrorContext>()
})

export type DataFetcherState = typeof dataFetcherState._Union
export type DataFetcherStateTags = typeof dataFetcherState._Tags
export type DataFetcherStateContext = typeof dataFetcherState._Record

export const state = unionCreator(UnionTypes.STATE)({
  dataFetcher: dataFetcherState
})

export type State = {
  dataFetcher: DataFetcherState
}

export default state