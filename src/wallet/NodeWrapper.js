
//TODO: error handling
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



 async function async_post(method_in, params_in) {

    //const infoData =  await apiGet(infoURL);
    /*const infoData =  await axiosApi.post('',data_to_send)
        .then(function (response){

            setTimeout(() => {
                console.log("wait over");
            }, 3000);

            return response.data;
        });

    console.log("got in sync post: "+JSON.stringify(infoData));
    return infoData;*/

    var built_msg = {
        method:method_in,
        params:params_in,
        id: 1
    };
    
    
    return new Promise(function(resolve, reject) {
        axiosApi.post('',built_msg)
            .then(function (response){

                if(response.data.hasOwnProperty('error')){
                    //we got an error, handle later
                }
                return resolve(response.data.result);
            });
    });

}



module.exports = {

    async_post:   async function (method, params){
        return  await async_post(method,params);
    }


};