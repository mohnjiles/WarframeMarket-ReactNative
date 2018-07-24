const axios = require('axios');
const BaseUrl = 'https://api.warframe.market/v1/items'
export { getItemDetails }

function getItemDetails(urlName) {
    return axios.get(`${BaseUrl}/${urlName}/orders?include=item`).then(response => response.data);
}