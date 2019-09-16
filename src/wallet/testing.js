

const axios = require("../../node_modules/axios");
let axiosApi;
axiosApi = axios.create({
    baseURL: "http://127.0.0.1:18231",
    timeout: 30000,
    headers: {'Authorization': 'Basic aWY3N0lqTTAyaXJIOUkxTDpNa0VZaTJqM0hPSDQzZ2hZTkZwMnN4MGg1ejRCckY1MUZXVVgxN1JlTnhNVUVUdHVJYUlaRWl1Yk94UE8xWUN2'}

});

function apiGet(url) {
    const resp =  axiosApi(url);
    return resp.data;
}

function apiPost(url, form) {
    const resp =  axiosApi.post(url, querystring.stringify(form));
    return resp.data;
}


async function asynccall(data_to_send) {

    const infoURL = "/status?q=getInfo";
    //const infoData =  await apiGet(infoURL);
     const infoData = await axiosApi.post('',data_to_send)
         .then(function (response){
             console.log(JSON.stringify(response.data));
             return response.data;
     });



}

asynccall({
    method: "getinfo",
    params: [],
    id: 1
});