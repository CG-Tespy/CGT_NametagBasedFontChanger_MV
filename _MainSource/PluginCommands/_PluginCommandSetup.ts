import { SetEntry } from './SetEntry';

let commandsToRegister = 
[
    SetEntry,
];

let prefix = "CGTNaBaFoCh_";
let commandMap = CGT.Core.PluginCommands.commandMap;

for (const command of commandsToRegister)
{
    let commandName = prefix + command.name;
    commandMap.set(commandName, command);
}