#!/bin/bash

npm install
npm run build
npm run test

git add . 
git commit -m "$1"
git tag -f -a -m "$1" v1
git push -f --tags