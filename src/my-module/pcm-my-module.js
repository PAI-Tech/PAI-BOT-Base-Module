const { PAICodeCommand, PAICodeCommandContext, PAICodeModule, PAICode, PAIModuleConfigParam, PAIModuleConfig, PAILogger, PAIModuleCommandSchema, PAIModuleCommandParamSchema } = require('@pai-tech/pai-code');


class PCM_MY_MODULE extends PAICodeModule
{
    constructor() {
    
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
     * load basic module commands from super
     * and load all the functions for this module
     */
    async load()
    {
        await super.load(this);
    
        this.loadCommandWithSchema(new PAIModuleCommandSchema({
            op: "func",
            func:"my_func"
        }));
        
    }
    
    
    setModuleName() {
        return 'my-module'; // TODO: change this ! the module name must be unique
    }
    
    /**
     *
     * @param {PAICodeCommand} cmd
     */
    my_func(cmd)
    {
        return new Promise( (resolve,reject) => {
            return resolve('Hello World');
        });
    }
    
    
}

module.exports = PCM_MY_MODULE;