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
    let item;
    try {

  
      const queryText1 =   {
        
        text: 'select mtc_room.fn_addusers($1,$2,$3,$4,$5,$6,$7,$8);',
        values:   [   
          req.body.username,req.body.firstname,req.body.lastname,req.body.contactno,req.body.password,'0' ,'e1ce2803-8198-4ea5-acc9-31a178f1cf0a',
          'Sonal'   
      ],
      rowMode: 'array'
    };
    
      await client.query("BEGIN");
      const dbResponse1 = await client.query(queryText1);
   
      //dbResponse Object will have two index one for Select query and one for FETCH
      //We are interested in second index 0: SELECT ,1: FETCH 
      console.log(dbResponse1)
      
      const cursorResponse1 = dbResponse1;
    
      console.log(cursorResponse1.rows);

     
  
      item = cursorResponse1.rows;
   
      console.log("item",item); await client.query("COMMIT");
     
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
      client.end();
      return item;
    }
  
 
  };
  

  exports.LoginInUser = async (req, res, body) => {
    console.log("body");
      
    console.log(req.body);
    let item;
    let client = await pool.connect();
  
    try {

  
      const queryText1 =  {
        
        text: 'select mtc_room.fn_loginUser($1,$2,$3);',
        values:   [   
          req.body.username,req.body.password,'e1ce2803-8198-4ea5-acc9-31a178f1cf0a'
      ],
      rowMode: 'array'
    };
    
      await client.query("BEGIN");
      const dbResponse1 = await client.query(queryText1);
   
      //dbResponse Object will have two index one for Select query and one for FETCH
      //We are interested in second index 0: SELECT ,1: FETCH 
      console.log(dbResponse1)
      
      const cursorResponse1 = dbResponse1;
    
      console.log(cursorResponse1.rows);

     
  
      item = cursorResponse1.rows;
   
      console.log("item",item);
      await client.query("COMMIT");
     
    } catch (e) {
      console.log("in catch")
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
      console.log("at endf")
      client.end();
      return item;
    }
   
   
  };



  exports.getUserDetail =  (req, res, body) => {
    
      return new Promise(async (resolve,reject)=>{

          
    let item;
  
    try {
      const pool = new Pool({
        connectionString: connectionString
      });
  
      let client = await pool.connect();

      const queryText1 =   {
        text: 'select mtc_room.fn_getuserdetail($1);',
        values:   [   
          req.body.username
      ],
      //  rowMode: 'array'
    };
    
      await client.query("BEGIN");
      const dbResponse1 = await client.query(queryText1);
      console.log(dbResponse1)
  
      const bdresp = await client.query('Fetch all in "getuserdetail"');
      console.log(bdresp.rows);
       item=bdresp.rows;
      console.log(item);
      await client.query("COMMIT");
     // await client.release()
      resolve(item)
     
    } catch (e) {
      console.log("in catch")
      //await client.query("ROLLBACK");
      reject(e)
    } 
   
  }) 
   
  };

  exports.activateUserAccount = async (req, res, body) => {
    console.log("body");
      
    console.log(req.body);

    let client = await pool.connect();
    let item;
    try {

  
      const queryText1 =   {
        
        text: 'select mtc_room.fn_verifyusers($1);',
        values:   [   
          req.body.emailid
      ],
      rowMode: 'array'
    };
    
      await client.query("BEGIN");
      const dbResponse1 = await client.query(queryText1);
   
      //dbResponse Object will have two index one for Select query and one for FETCH
      //We are interested in second index 0: SELECT ,1: FETCH 
      console.log(dbResponse1)
      
      const cursorResponse1 = dbResponse1;
    
      console.log(cursorResponse1.rows);

     
  
      item = cursorResponse1.rows;
   
      console.log("item",item); await client.query("COMMIT");
     
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
      client.end();
      return item;
    }
  
 
  };

  
  