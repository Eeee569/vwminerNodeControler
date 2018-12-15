var settings = require('../../../settings');


 function getHostInfo(host,command){


    var Client = require('ssh2').Client;

    var conn = new Client();
    conn.on('ready', function() {
        console.log('Client :: ready');


        conn.exec(command, function(err, stream) {
            if (err) throw err;
            stream.on('close', function(code, signal) {
                conn.end();
            }).on('data', function(data) {
                console.log(data.toString());
                //return data;
            }).stderr.on('data', function(data) {
                console.log(data.toString());
                //return data;
            });
        });


        conn.exec("ls", function(err, stream) {
            if (err) throw err;
            stream.on('data', function(data) {
                console.log(data.toString());
                //return data;
            }).stderr.on('data', function(data) {
                console.log(data.toString());
                //return data;
            });
        });



    }).connect({


        host:settings.hosts[host],
        username:settings.hostusername[host],
        port: 22,
        password: settings.hostpassword[host]




    })



    return null;
}



 function getHostStorageList(host){

    //console.log(settings.hostpassword[host]);

    let storageList = [];

    /*

    storage object {
        name:'',
        size:'',
        freeSpace:''
    }


     */

    //esxcli storage filesystem list  //along with size and free space //look for VMFS format type
    //await runComand(host,'esxcli storage filesystem list');
    var datastoreListString =   runComand(host,'esxcli storage filesystem list');
    /*console.log(datastoreListString);

    var lineList = datastoreListString.split('\n');
    lineList. splice(0,2);
    lineList.forEach(line, function(line) {
        let words = lineList.split(" ");
        console.log(words[3]+"\n");

    });*/




}

function getRAMDetails(host) {



}



function poweroffVM(host,vmid){

}


module.exports = {

    getHostStorageList: function (host){
        getHostStorageList(host);
    }


};