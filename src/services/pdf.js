import Api, { API_ENDPOINT } from "./config"

const API_URL = API_ENDPOINT + "/pdf"

async function sendHTMLForPdf(payload) {
    try {
        const res = await Api.post(API_URL + "/generate", payload)
        return res
    } catch (err) {
        throw err
    }
}

export const pdfApi = {
    sendHTMLForPdf,
}