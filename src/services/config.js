
export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT_DEV


function API() {

    this.makeRequest = async function ({ url, method, payload, headers }) {
        try {
            const options = {
                method,
                headers,
                body: JSON.stringify(payload)
            }
            if (!!payload) {
                options.body = JSON.stringify(payload)
            }
            const response = await fetch(url, options)
            return response
        } catch (err) {
            throw err
        }
    }

    this.post = async function (url, payload) {
        try {
            const response = await this.makeRequest({
                url,
                method: "POST",
                payload,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            return response
        } catch (err) {
            throw err
        }
    }
}
const Api = new API()

export default Api