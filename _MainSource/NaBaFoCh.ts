import { pluginParamsReady } from './PluginParamSetup/_PluginParamSetup';
import { FontChangeSettings } from './Structures/FontChangeSettings';
import "./PluginCommands/_PluginCommandSetup";
import { PluginParams } from './Structures/NaBaFoChPluginParams';
import { RegexEntry } from './Structures/RegexEntry';

export let NaBaFoCh = 
{
    version: "2.01.01",
    Params: pluginParamsReady,
    FontChangeSettings: FontChangeSettings,
    PluginParamsClass: PluginParams,
    RegexEntry: RegexEntry,
};