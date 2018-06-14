#!/bin/bash

sudo ls #get root first thing


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

