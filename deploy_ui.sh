#!/bin/sh

npm run build
rm -rf ../osa3/build 
cp -r build ../osa3/