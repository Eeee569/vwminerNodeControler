#!/bin/bash

sudo /home/$USER/.acme.sh/acme.sh --renew -d $USER.vwminer.com --force

sudo cp /home/$USER/.acme.sh/$USER.vwminer.com/ca.cer /usr/share/ca-certificates/ca.crt

sudo dpkg-reconfigure ca-certificates

sudo reboot
