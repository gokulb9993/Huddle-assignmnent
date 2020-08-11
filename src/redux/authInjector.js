import { RSAA } from 'redux-api-middleware'

export default function () {
    return function (next) {
        return function (action) {
            const callApi = action[RSAA]
            if (callApi) {
                let _auth = {
                    "Content-Type": "application/json; charset=utf-8"
                }
                callApi.headers = Object.assign({}, _auth, callApi.headers)
            }
            return next(action)
        }
    }
}