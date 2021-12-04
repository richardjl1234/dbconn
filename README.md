# Node.js db2 connection to on-premise z/OS DB2  (SSL connection)

This repo is to explain how to use node.js ibm_db package connect to on-premise z/OS database.  (SSL connection)


## Get this repository into your local

1. Make sure git is installed in your local machine
1. Use `git clone` command to clone this repository to your local machine

## Run the app locally

1. run `build.sh 0.1` to create the docker image db-conn:0.1
1. run `./convert.sh tempenv.txt` to create the `env.list` file. `env.list` is ignored from this git repo
1. run `./test_locat.sh 0.1` to launch the docker image.
1. Access the running app in a browser at <http://localhost:8080>

[Install Node.js]: https://nodejs.org/en/download/


## A Few Points to enable the successful connection

1. the licence file is needed as well to enable the connection to z/OS DB2. the file is db2consv_ee.lic. This file is not shared in github.
1. reference to ibm_db npm package, refer to this link: https://www.npmjs.com/package/ibm_db



