import { entryManager } from './PluginParamSetup/_PluginParamSetup';
import { FontChangeSettings } from './Structures/FontChangeSettings';
import "./PluginCommands/_PluginCommandSetup";

export let NaBaFoCh = 
{
    version: "2.01.01",
    activeEntryManager: entryManager,
    FontChangeSettings: FontChangeSettings,
};