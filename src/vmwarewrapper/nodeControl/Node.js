//using https://github.com/mscdex/ssh2



class Node{




    constructor(id,ip, username, password, tmuxid,type){
        this.id = id;
        this.ip = ip;
        this.username = username;
        this.password = password;
        this.tmuxid = tmuxid;
        this.type = type;

    }


    runComandTmux(command){

        if(this.tmuxid==null)return false;

        var commandtosend = ('tmux send -t '+ this.tmuxid +' '+ command.replace(/ /g," SPACE ") + ' ENTER' );
        var Client = require('ssh2').Client;

        var conn = new Client();
        conn.on('ready', function() {
            console.log('Client :: ready');
            conn.exec(commandtosend, function(err, stream) {

                if (err) throw err;
                stream.on('close', function(code, signal) {
                    console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                    conn.end();
                }).on('data', function(data) {
                    console.log('STDOUT: ' + data);
                }).stderr.on('data', function(data) {
                    console.log('STDERR: ' + data);
                });
            });
        }).connect({
            host:this.ip,
            username:this.username,
            port: 22,
            password: this.password
        })
        return true;
    }

    runComand(command){


        var Client = require('ssh2').Client;

        var conn = new Client();
        conn.on('ready', function() {
            console.log('Client :: ready');
            conn.exec(command, function(err, stream) {
                if (err) throw err;
                stream.on('close', function(code, signal) {
                    console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                    conn.end();
                }).on('data', function(data) {
                    console.log('STDOUT: ' + data);
                }).stderr.on('data', function(data) {
                    console.log('STDERR: ' + data);
                });
            });
        }).connect({
            host:this.ip,
            username:this.username,
            port: 22,
            password: this.password
        })



        return true;
    }






}