import { FontChangeSettings } from '../Structures/FontChangeSettings';
let pluginName = "CGT_NametagBasedFontChangerMV";
let params = PluginManager.parameters(pluginName);
let allInStringifiedArr = params["Font Change Settings"];
export let FontChangeSettingArr = FontChangeSettings.ArrFromPluginParamArr(allInStringifiedArr);
