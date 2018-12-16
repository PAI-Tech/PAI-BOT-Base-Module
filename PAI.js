const { PAICodeCommand, PAICodeCommandContext, PAICodeModule, PAICode } = require('@pai-tech/pai-code');
const { Module } = require('./index');

async function start(){
    
    let module = new Module();
    await module.registerModule(); // register the module to PAICode
    
    let context = new PAICodeCommandContext('host','HardCoded');
    let response = await PAICode.executeString(`my-module func`,context);
    
    let toPrint = JSON.stringify(response[0].response.data);
    console.log(toPrint);
    
    PAICode.start();
}

start().then().catch(e => {
    console.log(e)
});






