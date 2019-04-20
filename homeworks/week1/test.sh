#!/bin/bash

for ((i=1; i<=$1; i++))
do
    touch "$i.js";

done

echo "檔案建立完成";