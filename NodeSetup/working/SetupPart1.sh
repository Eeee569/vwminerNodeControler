#!/bin/bash

sudo ls #get root first thing

sudo bash -c 'cat <<EOF >> /etc/gai.conf
precedence ::ffff:0:0/96 100
EOF'

sudo apt-get update
 

sudo apt -y install pwgen


sudo fallocate -l 4G /swapfile


sudo chmod 600 /swapfile

sudo mkswap /swapfile

sudo swapon /swapfile


sudo bash -c 'cat <<EOF >> /etc/fstab
/swapfile none swap sw 0 0
EOF'



sudo bash -c 'cat <<EOF >> /etc/sysctl.conf
vm.swappiness=10
EOF'



sudo apt-get install -y apt-transport-https lsb-release


echo 'deb https://zencashofficial.github.io/repo/ '$(lsb_release -cs)' main' | sudo tee --append /etc/apt/sources.list.d/zen.list

gpg --keyserver ha.pool.sks-keyservers.net --recv 219F55740BBF7A1CE368BA45FB7053CE4991B669

gpg --export 219F55740BBF7A1CE368BA45FB7053CE4991B669 | sudo apt-key add -

sudo apt-get update

sudo apt-get install -y zen

zen-fetch-params

zend


sudo bash -c 'USERNAME=$(pwgen -s 16 1);PASSWORD=$(pwgen -s 64 1);cat <<EOF > ~/.zen/zen.conf
rpcuser=$USERNAME
rpcpassword=$PASSWORD
rpcport=18231
rpcallowip=127.0.0.1
server=1
daemon=1
listen=1
txindex=1
logtimestamps=1
### testnet config
#testnet=1
EOF'

zend

sudo apt install socat

cd

sudo apt-get install -y git

git clone https://github.com/Neilpang/acme.sh.git


cd acme.sh

./acme.sh --install

sudo ~/.acme.sh/acme.sh --issue --standalone -d $USER.vwminer.com

#scipping crontab

sudo cp /home/$USER/.acme.sh/$USER.vwminer.com/ca.cer /usr/share/ca-certificates/ca.crt

sudo update-ca-certificates


zen-cli stop

sudo bash -c 'FQDN=$USER.vwminer.com;cat <<EOF >> ~/.zen/zen.conf
tlscertpath=/home/$USER/.acme.sh/$FQDN/$FQDN.cer 
tlskeypath=/home/$USER/.acme.sh/$FQDN/$FQDN.key
EOF'

zend


# test for tls=true with zen-cli getnetworkinfo



#acme takes parameters