#!/bin/bash

cd "`dirname \"$0\"`"

rm -rf _site
mkdir -p _site

sudo mount -t tmpfs -o size=1G tmpfs _site
