//using shelljs https://www.npmjs.com/package/shelljs


class Node{


    constructor(id){
        //lookup in database
        this.node_ssh = require('node-ssh');

    }

    constructor(id, tmuxid){
        //lookup in database
        this.node_ssh = require('node-ssh');


    }

    constructor(ip, username, password){
        this.ip = ip;
        this.username = username;
        this.password = password;
        this.node_ssh = require('node-ssh');
        this.ssh = new node_ssh();
        this.tmuxid=null;
        this.ssh.connect({
            host:this.ip,
            username:this.username,
            port: 22,
            password:this.password
        })

    }

    constructor(ip, username, password, tmuxid){
        this.ip = ip;
        this.username = username;
        this.password = password;
        this.tmuxid = tmuxid;
        this.node_ssh = require('node-ssh');
        this.ssh = new node_ssh();
        this.ssh.connect({
            host:this.ip,
            username:this.username,
            port: 22,
            password:this.password
        })

    }


    runComand(command,useTmux){
        if(this.tmuxid!=null && useTmux){
            ssh.execCommand('tmux',['a', ('-t '+this.tmuxid)],{vwd:command+' ENTER'}).then(function(result) {
                console.log('STDOUT: ' + result.stdout)
                console.log('STDERR: ' + result.stderr)
            })
        }else{
            ssh.execCommand(command).then(function(result) {
                console.log('STDOUT: ' + result.stdout)
                console.log('STDERR: ' + result.stderr)
            });

        }
        return true;
    }

    runComand(command){
        ssh.execCommand(command).then(function(result) {
            console.log('STDOUT: ' + result.stdout)
            console.log('STDERR: ' + result.stderr)
        });
        return true;
    }

    kill(){
        this.ssh.dispose();
    }






}


var testserver = new Node('localhost','will','wolfe1234','temp');

testserver.runComand('mkdir test',true);
testserver.kill();