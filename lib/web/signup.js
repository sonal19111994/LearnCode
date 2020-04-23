/* eslint-disable */
'use strict';


const { Pool } = require("pg");
// const rp = require("request-promise");
const connectionString = `${process.env.DBSTRING}?ssl=true`;
const pool = new Pool({
  connectionString: connectionString
});
exports.signInUser = async (req, res, body) => {
    console.log("body");
      
    console.log(req.body);

    let client = await pool.connect();
  
    try {

  
      const queryText1 =   client.query({
        
        text: 'select mtc_room.fn_addusers($1,$2,$3,$4,$5,$6,$7,$8);',
        values:   [   
          req.body.username,req.body.firstname,req.body.lastname,req.body.contactno,req.body.password,'1' ,'e1ce2803-8198-4ea5-acc9-31a178f1cf0a',
          'Sonal'   
      ],
      rowMode: 'array'
    });
    
      await client.query("BEGIN");
      const dbResponse1 = await client.query(queryText1);
   
      //dbResponse Object will have two index one for Select query and one for FETCH
      //We are interested in second index 0: SELECT ,1: FETCH 
      
      const cursorResponse1 = dbResponse1[1];
    
      console.log(cursorResponse1.rows);
  
      item.loadStatelist = cursorResponse1.rows;
   
      console.log("item",item);
      await client.query("COMMIT");
     
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
    client.end();
   res.send();
  };
  

  exports.LoginInUser = async (req, res, body) => {
    console.log("body");
      
    console.log(req.body);

    let client = await pool.connect();
  
    try {

  
      const queryText1 =   client.query({
        
        text: 'select mtc_room.fn_loginUser($1,$2,$3);',
        values:   [   
          req.body.username,req.body.password,'e1ce2803-8198-4ea5-acc9-31a178f1cf0a'
      ],
      rowMode: 'array'
    });
    
      await client.query("BEGIN");
      const dbResponse1 = await client.query(queryText1);
   
      //dbResponse Object will have two index one for Select query and one for FETCH
      //We are interested in second index 0: SELECT ,1: FETCH 
      
      const cursorResponse1 = dbResponse1[1];
    
      console.log(cursorResponse1.rows);
  
      item.loadStatelist = cursorResponse1.rows;
   
      console.log("item",item);
      await client.query("COMMIT");
     
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
    client.end();
   res.send();
  };
  