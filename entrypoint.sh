#!/bin/sh

WORKSPACE=${WORKSPACE:-$PWD}

export CI_BUILD_ID=${GITHUB_RUN_ID:-$CI_BUILD_ID}
export CI_BUILD_NUMBER=${GITHUB_RUN_NUMBER:-$CI_BUILD_NUMBER}
export EVENT_PATH=${GITHUB_EVENT_PATH:-$EVENT_PATH}
export COMMIT_HASH=${GITHUB_SHA:-$COMMIT_HASH}
export COMMIT_REF=${GITHUB_REF:-$COMMIT_REF}
export COMMIT_REF_NAME=${GITHUB_REF_NAME:-$COMMIT_REF_NAME}
export REPOSITORY=${GITHUB_REPOSITORY:-$REPOSITORY}

echo "WORKSPACE=$WORKSPACE"
echo "CI_BUILD_ID=$CI_BUILD_ID"
echo "CI_BUILD_NUMBER=$CI_BUILD_NUMBER"
echo "EVENT_PATH=$EVENT_PATH"
echo "COMMIT_HASH=$COMMIT_HASH"
echo "COMMIT_REF=$COMMIT_REF"
echo "COMMIT_REF_NAME=$COMMIT_REF_NAME"
echo "REPOSITORY=$REPOSITORY"

cd $WORKSPACE

TS_NODE_COMPILER_OPTIONS='{"module":"commonjs"}' npx lost-pixel $@
