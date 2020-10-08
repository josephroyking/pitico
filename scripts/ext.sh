#!/bin/bash

build() {
    echo 'Building Extension...'

    rm -rf dist/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    yarn build

    mkdir -p dist
    cp -r build/* dist

    mv dist/manifestExtension.json dist/manifest.json
}

build