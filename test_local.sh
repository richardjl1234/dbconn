# usages: ./test_local.sh 0.1
echo usages: ./test_local.sh  0.1
docker run  \
   -u nobody \
   --env-file env.list \
   -p 8080:8080 \
   -it db-conn:$1
