

const axios = require("axios");
let axiosApi;


NODE_URL = "http://127.0.0.1";
NODE_PORT = "18231";
AUTHORIZATION = "aWY3N0lqTTAyaXJIOUkxTDpNa0VZaTJqM0hPSDQzZ2hZTkZwMnN4MGg1ejRCckY1MUZXVVgxN1JlTnhNVUVUdHVJYUlaRWl1Yk94UE8xWUN2";




axiosApi = axios.create({
    baseURL: NODE_URL+":"+NODE_PORT,
    timeout: 30000,
    headers: {'Authorization': 'Basic '+AUTHORIZATION}

});



async function async_post(data_to_send) {

    const infoURL = "/status?q=getInfo";
    //const infoData =  await apiGet(infoURL);
    const infoData = await axiosApi.post('',data_to_send)
        .then(function (response){
            console.log(JSON.stringify(response.data));
            return response.data;
        });


}



module.exports = {

    async_post: function (data_to_send){
        async_post(data_to_send);
    }


};