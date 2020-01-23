#!/bin/bash
#renewIP
sudo dhcpcd -k;
sudo ifup ens3;
#install docker software