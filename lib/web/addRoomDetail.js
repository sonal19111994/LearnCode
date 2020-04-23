/* eslint-disable */
'use strict';


const { Pool } = require("pg");
// const rp = require("request-promise");
const connectionString = `${process.env.DBSTRING}?ssl=true`;
const pool = new Pool({
  connectionString: connectionString
});

exports.loadaddRoomDetail = async (req, res, body) => {

    var item = {};

    item.loadStatelist = [];
    item.loadRoomrentlist = [];
    item.loadCitylist = [];
    item.loadFacilitylist = [];
    item.loadroomapplicabletypelist = [];
    item.loadVendorlist = [];
      
  // note: we don't try/catch this because if connecting throws an exception
  // we don't need to dispose of the client (it will be undefined)
  let client = await pool.connect();

  try {
    // client = await pool.connect();
    const queryText1 = 'SELECT * FROM "mtc_room".fn_loadstatelist();FETCH ALL IN "loadStatelist";'
  
    const queryText2 ='select * from "mtc_room".fn_loadroomrentlist() as result;FETCH ALL  IN  "loadRoomrentlist";'
    const queryText3='select * from "mtc_room".fn_loadcitylist() as result;FETCH ALL  IN  "loadCitylist";'
    const queryText4='select * from "mtc_room".fn_loadfacilitylist() as result;FETCH ALL  IN  "loadFacilitylist";'
    const queryText5='select * from "mtc_room".fn_roomapplicabletypelist() as result;FETCH ALL  IN  "loadroomapplicabletypelist";'
    const queryText6='select * from "mtc_room".fn_loadVendorlist() as result;FETCH ALL  IN  "loadVendorlist";'
   
   
      
    await client.query("BEGIN");
    const dbResponse1 = await client.query(queryText1);
    const dbResponse2 = await client.query(queryText2);
    const dbResponse3 = await client.query(queryText3);
    const dbResponse4 = await client.query(queryText4);
    const dbResponse5 = await client.query(queryText5);
    const dbResponse6 = await client.query(queryText6);
    //dbResponse Object will have two index one for Select query and one for FETCH
    //We are interested in second index 0: SELECT ,1: FETCH
    const cursorResponse1 = dbResponse1[1];
    const cursorResponse2 = dbResponse2[1];
    const cursorResponse3 = dbResponse3[1];
    const cursorResponse4 = dbResponse4[1];
    const cursorResponse5 = dbResponse5[1];
    const cursorResponse6 = dbResponse6[1];
    console.log(cursorResponse1.rows);

    item.loadStatelist = cursorResponse1.rows;
    item.loadRoomrentlist = cursorResponse2.rows;
    item.loadCitylist =  cursorResponse3.rows;;
    item.loadFacilitylist = cursorResponse4.rows;;
    item.loadroomapplicabletypelist = cursorResponse5.rows;
    item.loadVendorlist = cursorResponse6.rows;;

    console.log("item",item);
    await client.query("COMMIT");
   
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
  client.end();
                      
    res.render('addroomdetail', {
       loadadddetailpagedata : item
    });
};


exports.addRoomDetaildata = async (req, res, body) => {
      
  console.log(body);
  console.log(req.body.State);
  console.log(req.params.State);
  let client = await pool.connect();

  try {
    // client = await pool.connect();
   
    // const queryText1 = ('select mtc_room.fn_AddRoomdetail($1,$2,$3,$4,$5,$6.$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18); ',
    // [   
    //     req.body.State,req.body.City,req.body.Ownername,req.body.Roomtype,req.body.contactno,req.body.maxpeople,
    //     req.body.facility,req.body.Roomfor,req.body.myFile,req.body.myFilesecondary,req.body.landmark,
    //     req.body.address,req.body.extrainfo,req.body.specialfeature,req.body.roomdetail,req.body.roomrent,
    //     req.body.bookedornot,'Sonal'   
    // ]);

    const queryText1 =   client.query({
      
      text: 'select mtc_room.fn_AddRoomdetail($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18);',
      values:   [   
        req.body.State,req.body.City,req.body.Ownername,req.body.Roomtype,req.body.contactno,req.body.maxpeople,
        JSON.parse(req.body.facility),JSON.parse(req.body.Roomfor),req.body.myFile,JSON.parse(req.body.myFilesecondary),req.body.landmark,
        req.body.address,JSON.parse(req.body.extrainfo),JSON.parse(req.body.specialfeature),req.body.roomdetail,req.body.roomrent,
        req.body.bookedornot,'Sonal'   
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







 