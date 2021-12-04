echo $#
if [ $# -eq 0 ]
then
   echo 'Missing db-conn docker image version number....'
   echo 'Usage: ./build.sh db-conn_docker_version , example: ./build.sh 0.1 [hub]'
   exit
fi
# bring the common package into current repo
# create the docker image and push to docker hub when needed.
docker build -t db-conn:$1 .
docker tag db-conn:$1 richardjl/db-conn:$1
if [ "$2" = "hub" ]
then
   docker push richardjl/db-conn:$1
fi


