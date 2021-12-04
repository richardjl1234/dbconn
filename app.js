var http = require('http');
var url = require('url') ;
var fs = require('fs');
var request = require('request');
var fs = require("fs-extra");
var ibmdb = require('ibm_db');

var sql_odm = fs.readFileSync('odm_sample.sql', 'utf8') ;
var sql_cedp = "select * from odm_odmprd.odmt_domain fetch first 20 rows only; "

// set up the connection parameters for ONPRE
odm_conn_parm = {
   database: process.env.ONPRE_DB_NAME,
   hostname: process.env.ONPRE_HOST,
   port: process.env.ONPRE_PORT,
   protocol: 'TCPIP',
   uid : process.env.ONPRE_USERID,
   pwd : process.env.ONPRE_USERID_PASSWORD,
   Security: 'SSL',
   sslservercertificate: '/app/carootcert.arm'
}

//console.log(cedp_conn_parm);
console.log(odm_conn_parm);
console.log('sql statement is: \n', sql_odm);
data = '' ;
n = 0;  // count for the feedback count
http.createServer(function(request, response) {
   response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
   if(request.url!=="/favicon.ico"){
      n = n+1
      console.log('http server is running... ');
      response.write('the page is hit ' + n + ' times!' ) ;

      // query on-premise database and show result on console
      console.log('sql statement is: \n', sql_odm);
      query_odm(odm_conn_parm, sql_odm)
         .then((result) => {console.log(JSON.stringify(result));
            response.write(JSON.stringify(result,2, null));
            response.end();

         })
         .catch(function(err) {console.log("\n" + err)});
   };
}).listen(8080);

// query_odm is the function to retrieve data from on-premise ODM database.

var query_odm = function( conn_parm, sql) {
   return new Promise(function(resolve,reject) {
      ibmdb.open(conn_parm, function(err, conn)
         {
            if(err) {
               reject("error" + err.message) ;
            } else {
               conn.query(sql , function(err, records, moreResultSets)
                  {
                     if(err){
                        reject(err);
                     }else{
                        conn.close(function(){ console.log("Connection Closed"); });
                        resolve(records);
                     }
                  });
            }
         });
   });
};

