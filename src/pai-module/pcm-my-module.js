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

        const pai_code_interface = require("./pai-code-interface");
        const pai_code_commands = pai_code_interface["pai-code-commands"];

        /* load commands from pai-code-interface.json file */
        if(pai_code_commands)
        {
            for(let cmd in pai_code_commands)
            {
                //console.log("command: " + pai_code_commands[cmd]["command-name"]);
                let pai_code_command_params = pai_code_commands[cmd]["params"];
                let schema_params = {};
                if(pai_code_command_params)
                {
                    schema_params.params = {};
                    for(let param in pai_code_command_params)
                    {
                        //console.log("param: " + pai_code_command_params[param].name);
                        let new_param = new PAIModuleCommandParamSchema(pai_code_command_params[param].name, pai_code_command_params[param].description, pai_code_command_params[param].required, pai_code_command_params[param].label,pai_code_command_params[param]["default-value"]);
                        schema_params.params[pai_code_command_params[param].name] = new_param;
                    }
                    //console.log(schema_params);
                }
                let pai_code_command_schema = new PAIModuleCommandSchema({
                    op: pai_code_commands[cmd]["command-name"] ,
                    func:pai_code_commands[cmd]["js-function"],
                    params:schema_params.params

                });
                this.loadCommandWithSchema(pai_code_command_schema);
            }
        }
      
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




    get_release_notes(cmd)
    {
        var pai_release_notes = fs.readFileSync(path.resolve(__dirname,"release-notes.txt"), 'utf8');
        return pai_release_notes;
    }

    my_command(cmd)
    {

        return cmd.params["my-param"].value;
    }



}

module.exports = PCM_MY_MODULE;