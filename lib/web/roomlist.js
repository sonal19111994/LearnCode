/* eslint-disable */
'use strict';


const { Pool } = require("pg");
// const rp = require("request-promise");
const connectionString = `${process.env.DBSTRING}?ssl=true`;
const pool = new Pool({
  connectionString: connectionString
});

exports.loadRoomList = async (req, res, body) => {
 
  let { userid='' }=req.body  
    console.log(body);
    req.body.userid = '1de95422-b76a-494b-a306-31c46aac7f28'
    
  
    console.log('body' ,req.body.userid);
    
    let client = await pool.connect();
  
    try {
  
  
      const queryText1 =   {
        text: 'select mtc_room.fn_loadroomlists($1);',
        values:   [   
          req.body.userid 
      ],
       rowMode: 'array'
    };
    
      await client.query("BEGIN");
      const dbResponse1 = await client.query(queryText1);
      console.log(dbResponse1)
  
      const bdresp = await client.query('Fetch all in loadroomlists');
      console.log(bdresp.rows);
      var item=bdresp.rows;
      console.log(item);
   
    
      await client.query("COMMIT");
     
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
   
    res.render('roomlist', {
      loadRoomListdata : item
   });
  };


  exports.ViewRoomdetail = async (req, res, body) => {
 
    let { userid='' }=req.body  
      console.log(body);
      console.log('body' ,req.body.id);
      let client = await pool.connect();
    
      try {
    
    
        const queryText1 =   {
          text: 'select mtc_room.fn_editroomdetail($1);',
          values:   [   
            req.body.id 
        ],
         rowMode: 'array'
      };
      
        await client.query("BEGIN");
        const dbResponse1 = await client.query(queryText1);
        console.log(dbResponse1)
    
        const bdresp = await client.query('Fetch all in "editRoomDetail"');
        console.log(bdresp.rows);
        var item=bdresp.rows;
        console.log(item);
        await client.query("COMMIT");
       
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      } finally {
        client.release();
      }
     
      res.send(item);
    };

    exports.DeleteRoomdetail = async (req, res, body) => {
 
      let { userid='' }=req.body  
        console.log(body);
        console.log('body' ,req.body.id);
        
        let client = await pool.connect();
      
        try {
      
      
          const queryText1 =   {
            text: 'select mtc_room.fn_deleteroomdetail($1);',
            values:   [   
              req.body.id 
          ],
           rowMode: 'array'
        };
        
          await client.query("BEGIN");
          const dbResponse1 = await client.query(queryText1);
          console.log(dbResponse1)
      
          const bdresp = await client.query('Fetch all in "deleteRoomDetail"');
          console.log(bdresp.rows);
          var item=bdresp.rows;
          console.log(item);
       
        
          await client.query("COMMIT");
         
        } catch (e) {
          await client.query("ROLLBACK");
          throw e;
        } finally {
          client.release();
        }
       
        res.send(item);
      };

      
  


  


