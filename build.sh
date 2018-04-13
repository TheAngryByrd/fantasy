#!/bin/bash

yarn install
dotnet restore
pushd src 
dotnet fable yarn-clean 
dotnet fable yarn-build
popd

