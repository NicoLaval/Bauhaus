#!/usr/bin/env bash

set -e

DOC_FOLDER="docs"
STORYBOOK_FOLDER="built-storybook"
SITE_FOLDER="website"

MAIN_BRANCH="master"
UPSTREAM="https://$GITHUB_TOKEN@github.com/$TRAVIS_REPO_SLUG.git"
MESSAGE="Rebuild doc for revision $TRAVIS_COMMIT: $TRAVIS_COMMIT_MESSAGE"
AUTHOR="$USER <>"

if [ "$TRAVIS_PULL_REQUEST" != "false" ];then
  echo "Documentation won't build on pull request"
  exit 0
fi

if [ "$TRAVIS_BRANCH" != "$MAIN_BRANCH" ];then
  echo "Documentation won't build: Not on branch $MAIN_BRANCH"
  exit 0
fi

function setup() {
  npm install -g yarn gitbook-cli
}

function buildDocumentation() {
  pushd "$DOC_FOLDER"
  gitbook install
  gitbook build
  popd
}

function buildStoryBook(){
  yarn build-storybook
}

function publish() {
  if [ -d "$SITE_FOLDER" ]; then rm -Rf $SITE_FOLDER; fi

  mkdir $SITE_FOLDER
  pushd "$SITE_FOLDER"

  cp -a "../$DOC_FOLDER/_book/." .


  mkdir app_storybook
  mkdir lib_storybook

  cp -R "../app/$STORYBOOK_FOLDER/." app_storybook
  cp -R "../packages/bauhaus-library/$STORYBOOK_FOLDER/." lib_storybook

  git init
  git remote add upstream "$UPSTREAM"
  git fetch --prune upstream
  git reset upstream/gh-pages
  git add --all .
  if git commit --message "$MESSAGE" --author "$AUTHOR" ; then
    git push --quiet upstream HEAD:gh-pages
  fi
  popd
}

function main() {
  setup && buildDocumentation && buildStoryBook && publish
}

main
