const axios = require("../../node_modules/axios");
let axiosApi;
axiosApi = axios.create({
    baseURL: "https://explorer.zensystem.io/api",
    timeout: 30000,
});

function apiGet(url) {
    const resp =  axiosApi(url);
    return resp.data;
}

function apiPost(url, form) {
    const resp =  axiosApi.post(url, querystring.stringify(form));
    return resp.data;
}


async function asynccall() {

    const infoURL = "/status?q=getInfo";
    //const infoData =  await apiGet(infoURL);
     const infoData = await axios.get('https://explorer.zensystem.io/api/status?q=getInfo');


    console.log(infoData.data.info)

}

asynccall();