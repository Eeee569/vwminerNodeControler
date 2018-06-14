#!/bin/bash
# run: ./createUser.sh username
sudo adduser $1 --gecos "First Last,RoomNumber,WorkPhone,HomePhone" --disabled-password
echo $1":wolfe1234" | sudo chpasswd
usermod -aG sudo $1