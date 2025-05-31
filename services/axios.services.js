const axios = require('axios');
const querystring = require('querystring');

const destinationCalls = async (data, body) => {
    try {
        const list = [];
        let requestData = null;
        for (const item of data) {
            const headers = JSON.parse(item.headers);
            if (['get', 'GET'].includes(item.method)) {
                const query = querystring.stringify(body)
                requestData = axios[item.method](`${item.url}?${query}`, headers)

            } else {
                requestData = axios[item.method](item.url, body, headers)
            }
            list.push(requestData)
        }
        await Promise.allSettled(list);
        return "destinations reached";
    }
    catch (error) {
        console.error(error);
        return "Check destination urls"
    }
}
module.exports = {
    destinationCalls
}