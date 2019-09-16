var settings = require('../../../settings');


 async function updateHosts(host,command){


    let mysql = require('mysql');
    var con =  mysql.createConnection(({
        host:settings.hosts[host],
        user:settings.hostusername[host],
        password: settings.hostpassword[host],
        database:settings.database[host]
    }));

     con.connect(function(err) {
         if (err) throw err;
         console.log("Connected!");
         var sql = "select * from Hosts";
         con.query(sql, function (err, result) {
             if (err) throw err;
             console.log(result);



            result.forEach(function(host){

                let ip = host.IP;
                let user = host.Username;
                let password = host.Password;



                var Client = require('ssh2').Client;

                var sshcon = new Client();
                sshcon.on('ready', function() {
                    console.log('Client :: ready');


                    if(host.IsActive == 0){
                        sqlConnection.query("update Hosts set IsActive=1 where ID="+host.ID, function (err, result) {
                            if (err) throw err;
                            console.log(result);
                        });
                    }


                    getHostTopStorageData(sshcon,con,host );




                    sshcon.exec("ls", function(err, stream) {
                        if (err) throw err;
                        stream.on('data', function(data) {
                            console.log(data.toString());
                            //return data;
                        }).stderr.on('data', function(data) {
                            console.log(data.toString());
                            //return data;
                        });
                    });



                }).on('error',function (err) {

                    console.log("error connection to host, setting status as inactive \n");

                    //Do aditional chekcing to see if VM's are up or if the entire system is down ********************************

                    sqlConnection.query("update Hosts set IsActive=0 where ID="+host.ID, function (err, result) {
                        if (err) throw err;
                        console.log(result);
                    });

                }).connect({


                    host:host.IP,
                    username:host.Username,
                    port: 22,
                    password: host.Password



                })



            });









         });
     });





    /*
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


*/
    return null;
}

async function getHostRamData(connection, sqlConnection, hostData) {



}





  async function getHostTopStorageData(connection, sqlConnection, hostData){



     let totalSpace = 0;
     let freeSpace = 0;
     let diskName

     connection.exec("esxcli storage filesystem list", function(err, stream) {
         if (err) throw err;
         stream.on('close', function(code, signal) {
            // connection.end();
         }).on('data', function(data) {
             console.log(data.toString());

             var lineList = data.toString().split('\n');
             lineList.splice(0,2);

             lineList.forEach( function(line) {
                 let words = line.split(" ");
                  //words.join('').split('');

                  words = words.filter(function(entry) { return entry.trim() != ''; });

                  if(words[4] !== "VMFS-6")return;

                  totalSpace += Number(words[5]);
                  freeSpace += Number(words[6]);




                 console.log(words[4]+" should be word\n");

             });
             totalSpace = Math.trunc(Math.floor(totalSpace/1073741824));
             freeSpace = Math.trunc(Math.floor(freeSpace/1073741824));

             console.log("total space: "+totalSpace+" free space: "+freeSpace);


             if(hostData.StorageTotal != totalSpace || hostData.StorageFree != freeSpace){




                 sqlConnection.query("update Hosts set StorageTotal="+totalSpace+", StorageFree="+freeSpace+" where ID="+hostData.ID, function (err, result) {
                     if (err) throw err;
                     console.log(result);
                 });

             }


             //return data;
         }).stderr.on('data', function(data) {
             console.log(data.toString());
             //return data;
         });
     });

    //let storageList = [];

    /*

    storage object {
        name:'',
        size:'',
        freeSpace:''
    }


     */

    //esxcli storage filesystem list  //along with size and free space //look for VMFS format type
    //await runComand(host,'esxcli storage filesystem list');
   // var datastoreListString =   runComand(host,'esxcli storage filesystem list');
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
    },
    updateHosts: function (host,command) {
        updateHosts(host,command);
    }


};