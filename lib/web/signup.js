var pg = require('pg');

var express = require('express');

var router = express.Router();

var config = {
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    idleTimeoutMillis: 30000000
};

exports.signInUser = function (req, resp, next) {
   

    pg.defaults.ssl = true;
    var pool = new pg.Pool(config);
    
    var username = req.body.username;
    var password = req.body.password;
   
    pool.connect(function (err, client, done) {

        if (err) {
            return console.error('error fetching client from pool', err);
        }
        var query = client.query("COMMIT;");
        query = client.query("begin;");
        query = client.query('select "HTSi_Owner".fngetexporthealth_and_postingfinal3_newposting($1,$2); ',
        [
            username, password
        ]);

    query.on("end", function (result) {
        var mycursor = client.query('FETCH ALL from "getexporthealth_and_posting";');
        mycursor.on("end", function (result) {
               
            // clearInterval(handleexp);
            var COMMIT = client.query("COMMIT;");
            done();
            client.end();
            pg.end();                 
            clearInterval(handleexp);
            resp.end();


        

        pool.on('error', function (err, client) {
            console.error('idle client error', err.message, err.stack);
        });
    });
});
});
    };

    exports.getexporthealth_and_posting_count = function (req, res, next) {
        pg.defaults.ssl = true;
        var pool = new pg.Pool(config);
        pool.connect(function (err, client, done) {
    
            if (err) {
                return console.error('error fetching client from pool', err);
            }
           
            client.query('BEGIN ;SELECT  "HTSi_Owner".fngetexporthealth_and_postingfinal_count();FETCH ALL from getexporthealth_and_posting_count;COMMIT', function (err, result) {
                console.log("lets do it2");
                done();
                client.end();
                pg.end();
                if (err) {
                    return console.error('error running query ', err);
                }
                res.send(result.rows);
            });
    
        });
        pool.on('error', function (err, client) {
            console.error('idle client error', err.message, err.stack);
        });
    };
    
