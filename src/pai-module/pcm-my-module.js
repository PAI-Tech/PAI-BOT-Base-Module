/*
 <PAI-BASE-MODULE>
 Author       : Ron Fridman
 Date Created : 08/11/2018
 Copyright PAI-TECH 2018, all right reserved

 This file is the entry point of your base module.


 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
  */


const { PAICodeCommand, PAICodeCommandContext, PAICodeModule, PAICode, PAIModuleConfigParam, PAIModuleConfig, PAILogger, PAIModuleCommandSchema, PAIModuleCommandParamSchema } = require('@pai-tech/pai-code');


class PCM_MY_MODULE extends PAICodeModule
{
    constructor() {

        // Module description that will be shown on info command [your-module-name info]
        let infoText = `
        Welcome to My Module:
        You can write here info text about your module.
        `;
    
        super(infoText);
    
        this.config.schema = [
            //PAIModuleConfigParam(label, description, paramName, defaultValue)
            // TODO: add configuration parameters
        ];
        
    }
    
    
    /**
     * This method runs when the module is being loaded by the bot it load basic module commands from super
     *
     * and load all the functions for this module
     */
    async load()
    {
        await super.load(this);

      
    }
    
    
    setModuleName() {
        return 'my-module'; // TODO: change this ! the module name must be unique
    }
    
    /**
     *
     * @param {PAICodeCommand} cmd
     */
	version(cmd){
		return require("./../../package").version;
	}
	
	
	
}

module.exports = PCM_MY_MODULE;