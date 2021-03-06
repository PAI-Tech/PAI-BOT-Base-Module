/*
 Module test page
 Author       : Ron Fridman
 Date Created : 08/11/2018
 Copyright PAI-TECH 2018, all right reserved

 This file is used to test your module without the bot environment.


 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
  */

const { PAICodeCommand, PAICodeCommandContext, PAICodeModule, PAICode } = require('@pai-tech/pai-code');
const { Module } = require('./index');

async function start(){
    
    let module = new Module();
    
    if(PAICode.modules["pai-bot"])
        await PAICode.modules["pai-bot"].applyBotDataSource(module);
    
    await module.registerModule(); // register the module to PAICode
    
    let context = new PAICodeCommandContext('host','HardCoded');
    let response = await PAICode.executeString(`my-module my-command my-param:"test"`,context);
    
    let toPrint = JSON.stringify(response[0].response.data);
    console.log(toPrint);
    
    PAICode.start();
}

start().then().catch(e => {
    console.log(e)
});






