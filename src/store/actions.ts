import { ofType } from 'unionize'
import { unionCreator, UnionTypes } from './helpers'

export const noopPayload = ofType<{}>()
export type NoopPayload = typeof noopPayload

export const dataRequestPayload = ofType<{}>()
export type DataRequestPayload = typeof dataRequestPayload

export const dataResponsePayload = ofType<{ data: any[] }>()
export type DataResponsePayload = typeof dataResponsePayload

export const dataResponseErrorPayload = ofType<{ error: string }>()
export type DataResponseErrorPayload = typeof dataResponseErrorPayload

export const actions = unionCreator(UnionTypes.ACTION)({
  dataRequest: dataRequestPayload,
  dataResponse: dataResponsePayload,
  dataResponseError: dataResponseErrorPayload,
  noop: noopPayload
})

export type Actions = typeof actions._Union
export type ActionsPayload = typeof actions._Record

export default actions