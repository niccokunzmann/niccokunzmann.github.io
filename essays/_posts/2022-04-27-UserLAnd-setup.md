---
layout: post
title: UserLAnd setup for development
language: en
---

Here, I want to write down my setup for the UserLAnd app.
Purpose: if I need to re-do the setup, I can easily do it.

## Packages

```
sudo apt-get update
sudo apt-get install git
```


## .bashrc

To start when the console opens:

```
# remove temp files - not automatic in UserLAnd
rm -rf /tmp/*

# bashtest and sdlink
export PATH="$PATH:$HOME/bashtest/:$HOME/sdlink/bin"
export BASHTEST_OPTION_PROGRESS=true

export SDLINK_DEFAULT_STORAGE="/host-rootfs/sdcard/sdlink"

# git-sparse
export PATH="$PATH:$HOME/gitlab-sparse-checkout/"

# ruby gems
export PATH="$PATH:$HOME/.gem/ruby/2.7.0/bin"

```

## sdlink

`sdlink` reduces the amount of space that we need on the internal storage.
install from https://gitlab.com/niccokunzmann/sdlink

## Python

```
sudo apt-get install virtualenv python3.9
cd ~
mkdir .venvs
cd .venvs
virtualenv -p python2.7 env2
virtualenv -p python3.9 env3
ln -sT ~/env2 ~/.venvs/env2/bin/activate
ln -sT ~/env3 ~/.venvs/env3/bin/activate
```

Activate python versions:
```
source ~/env2
source ~/env3
```

Linking to save space:

```
sdlink --link .venvs/env3/lib/python3.9
sdlink --link .venvs/env3/lib/python2.7
```

## Ruby and Jekyll

One line from here:
https://gist.github.com/blacktm/8302741#file-install_ruby_rpi-sh-L53
```
sudo apt-get install autoconf ...
```

```
sudo apt-get install rubygems
sudo apt-get remove ruby-docs
sudo apt-get autoremove
```


`.gemrc` to install as user and without docs
```
gem: --no-document --user-install
```

Install jekyll with lots of compiling:
```
gem install jekyll
```

Linking:
```
touch .gem/ruby/2.7.0/gems/ffi-1.15.5/lib/.sdlink
touch .gem/ruby/2.7.0/gems/sassc-2.4.0/.sdlink
touch .gem/ruby/2.7.0/gems/kramdown-parser-gfm-1.1.0/lib/.sdlink
sdlink --link .gem
```

## NodeJS

From audstanley/NodeJs-Raspberry-Pi: Install NodeJs on your Raspberry Pi 1, 2, 3, 4, zero, and zero w - https://github.com/audstanley/NodeJs-Raspberry-Pi

Linking ignore all bin folders:

```
find /opt/nodejs/ | grep -Ee '/bin$' | while read; do touch "$REPLY/.sdlink"; done
sdlink --link /opt/nodejs
```

.bashrc extension:

```
# from https://stackoverflow.com/questions/10081293/install-npm-into-home-directory-with-distribution-nodejs-package-ubuntu
# NPM packages in homedir
export NPM_PACKAGES="$HOME/.npm-packages"

# Tell our environment about user-installed node tools
export PATH="$NPM_PACKAGES/bin:$PATH"
# Unset manpath so we can inherit from /etc/manpath via the `manpath` command
export MANPATH="$NPM_PACKAGES/share/man:$MANPATH"

# Tell Node about these packages
export NODE_PATH="$NPM_PACKAGES/lib/node_modules:$NODE_PATH"

```

run
```
source ~/.bashrc
echo "prefix = $NPM_PACKAGES" > ~/.npmrc ; cat ~/.npmrc
```
