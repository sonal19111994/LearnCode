/* eslint-disable */
'use strict';


const { Pool } = require("pg");
// const rp = require("request-promise");
const connectionString = `${process.env.DBSTRING}?ssl=true`;
const pool = new Pool({
  connectionString: connectionString
});

exports.loadRoomList = async (req, res, body) => {
       
  var item = {};

  item.loadroomlists = [];
  item.requestedvistlist = [];
  let client = await pool.connect();

try {
// client = await pool.connect();
const queryText1 = 'SELECT * FROM "mtc_room".fn_loadadminroomlists();FETCH ALL IN "loadroomlists";'
const queryText2 = 'SELECT * FROM "mtc_room".fn_admin_getuser_fav_bookvisitlist();FETCH ALL IN "loadvisitbookinglist";'
await client.query("BEGIN");
const dbResponse1 = await client.query(queryText1);
const cursorResponse1 = dbResponse1[1];
console.log(cursorResponse1.rows);
item.loadroomlists = cursorResponse1.rows;
const dbResponse2 = await client.query(queryText2);
const cursorResponse2 = dbResponse2[1];
console.log(cursorResponse2.rows);
item.requestedvistlist = cursorResponse2.rows;
var  loadroomlistsdata =cursorResponse1 .rows;
var  isrequestevisitddata =cursorResponse2.rows;
console.log("item",item);
await client.query("COMMIT");

} catch (e) {
await client.query("ROLLBACK");
throw e;
} finally {
client.release();
}
client.end();
              
res.render('roomlist', {
  loadRoomListdata : loadroomlistsdata , isrequestedvist :isrequestevisitddata
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

      
      exports.LoadRoomdetailByID = async (req, res, next) => {
 
       
        
          let client = await pool.connect();
          let item;
        
          try {
        
        
            const queryText1 =   {
              text: 'select mtc_room.fn_getroomdetailByID($1);',
              values:   [   
                req.query.Room_ID 
            ],
             rowMode: 'array'
          };
          
            await client.query("BEGIN");
            const dbResponse1 = await client.query(queryText1);
            console.log(dbResponse1)
        
            const bdresp = await client.query('Fetch all in "getroomdetailByID"');
            console.log(bdresp.rows);
             item=bdresp.rows;
            console.log(item);
            await client.query("COMMIT");
           
          } catch (e) {
            await client.query("ROLLBACK");
            throw e;
          } finally {
            client.release();
            return item;
          }
         
         
        };

      
      exports.searchRoomdetail = async (req, res, next) => {
 
        
         
     
        
          console.log('body' ,req.query);
          
          let client = await pool.connect();
        
          try {
        
        
            const queryText1 =   {
              text: 'select mtc_room.fn_SearchRoomdetail($1,$2,$3);',
              values:   [   
                req.query.lng ,req.query.lat , req.query.location 
            ],
             rowMode: 'array'
          };
          
            await client.query("BEGIN");
            const dbResponse1 = await client.query(queryText1);
            console.log(dbResponse1)
        
            const bdresp = await client.query('Fetch all in "SearchRoomdetail"');
            console.log(bdresp.rows);
            var item=bdresp.rows;
            console.log(item);
         
          
            await client.query("COMMIT");
           
          } catch (e) {
            await client.query("ROLLBACK");
            throw e;
          } finally {
            client.release();
            return item;
          }
         
          
        };

        exports.addFavOrBookVisit = async (req, res, body) => {
 
        
         
     
        
          console.log('body' ,req.body);
          
          let client = await pool.connect();
          let item;
        
          try {
        
        
            const queryText1 =   {
              text: 'select mtc_room.fn_addupduserroomactivity($1,$2,$3,$4,$5);',
              values:   [   
                req.body.userid  ,req.body.roomid ,req.body.isbookvisit,req.body.isfav ,'Sonal'
            ],
             rowMode: 'array'
          };
          
            await client.query("BEGIN");
            const dbResponse1 = await client.query(queryText1);
            console.log(dbResponse1)
      
            const cursorResponse1 = dbResponse1;
          
            console.log(cursorResponse1.rows);
      
           
        
            item = cursorResponse1.rows;
         
            console.log("item",item);
         
          
            await client.query("COMMIT");
           
          } catch (e) {
            await client.query("ROLLBACK");
            throw e;
          } finally {
            client.release();
            return item;
          }
         
          
        };


        exports.getUserFavandBookVisitlist = async (req, res, next) => {
 
         console.log('session' ,req.session.userid );
          
          let client = await pool.connect();
        
          try {
        
        
            const queryText1 =   {
              text: 'select mtc_room.fn_getuser_fav_bookvisitlist($1);',
              values:   [   
                req.session.userid
            ],
             rowMode: 'array'
          };
          
            await client.query("BEGIN");
            const dbResponse1 = await client.query(queryText1);
            console.log(dbResponse1)
        
            const bdresp = await client.query('Fetch all in "loadfavlist" ;');
            console.log(bdresp.rows);
            var item=bdresp.rows;
            console.log(item);
         
          
            await client.query("COMMIT");
           
          } catch (e) {
            await client.query("ROLLBACK");
            throw e;
          } finally {
            client.release();
            return item;
          }
         
          
        };

        exports.getUserBookVisitlist = async (req, res, next) => {
 
          console.log('session' ,req.session.userid );
           
           let client = await pool.connect();
         
           try {
         
         
             const queryText1 =   {
               text: 'select mtc_room.fn_getuser_fav_bookvisitlist($1);',
               values:   [   
                 req.session.userid
             ],
              rowMode: 'array'
           };
           
             await client.query("BEGIN");
             const dbResponse1 = await client.query(queryText1);
             console.log(dbResponse1)
         
             const bdresp = await client.query('Fetch all in "loadvisitbookinglist" ;');
             console.log(bdresp.rows);
             var item=bdresp.rows;
             console.log(item);
          
           
             await client.query("COMMIT");
            
           } catch (e) {
             await client.query("ROLLBACK");
             throw e;
           } finally {
             client.release();
             return item;
           }
          
           
         };


        exports.AdminvisitBookinglist = async (req, res, body) => {
       
          var item = {};

          item.loadStatelist = [];
          let client = await pool.connect();

  try {
    // client = await pool.connect();
    const queryText1 = 'SELECT * FROM "mtc_room".fn_loadstatelist();FETCH ALL IN "loadStatelist";'
    await client.query("BEGIN");
    const dbResponse1 = await client.query(queryText1);
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
                      
    res.render('AdminPage', {
       loadadddetailpagedata : item
    });
};


        

      
  


  


