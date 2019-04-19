import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

mock.onGet('/data').reply(200, {
  data: [
    { id: 1, name: 'Record_1' },
    { id: 2, name: 'Record_2' },
    { id: 3, name: 'Record_3' },
    { id: 4, name: 'Record_4' }
  ]
})

export function getData () {
  return axios.get('/data')
}
