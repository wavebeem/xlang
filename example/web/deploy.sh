#!/bin/bash
files=(*)
rm -rf dist
mkdir dist
cp -r "${files[@]}" dist
s3cmd sync -P dist/ s3://mockbrian-xlang/
