#!/bin/sh
npm run build
rm -rf ../../../fullstack-heroku/build
cp -r build ../../../fullstack-heroku