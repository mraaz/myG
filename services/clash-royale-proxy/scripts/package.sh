#!/bin/bash

rm -rf dist
mkdir dist
cp -r build ./dist/build
cp -r node_modules ./dist/node_modules
