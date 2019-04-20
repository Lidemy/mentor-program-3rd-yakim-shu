#!/bin/bash
curl --silent https://api.github.com/users/$1 > profile.txt 

for keyword in name bio location blog
do
    grep -e $keyword profile.txt | awk -F ': "' '{print $2}' | awk -F '",' '{print $1}' 
done
