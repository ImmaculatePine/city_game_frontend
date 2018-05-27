import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { URL_API } from '../config'

const HEADERS = {
  'Content-Type': 'application/json'
}

const http = axios.create({
  adapter: httpAdapter,
  baseURL: URL_API,
  headers: HEADERS,
  transformResponse: [
    ...axios.defaults.transformResponse,
    data => camelizeKeys(data)
  ],
  transformRequest: [
    data => decamelizeKeys(data),
    ...axios.defaults.transformRequest
  ]
})

export default http
