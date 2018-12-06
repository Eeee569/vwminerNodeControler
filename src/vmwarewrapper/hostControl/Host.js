

class Host {


    constructor(id,ip,username,password) {
        this.id = id;
        this.ip = ip;
        this.username = username;
        this.password = password;


    }


    addNode(node){

        this.nodeList.push(node);
    }


}