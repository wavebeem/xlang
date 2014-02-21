#!/bin/bash
files=(*)
mkdir dist
cp -r "${files[@]}" dist
cd dist
www xlang
