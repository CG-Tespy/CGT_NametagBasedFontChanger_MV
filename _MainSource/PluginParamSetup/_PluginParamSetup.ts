import { FontChangeSettings } from '../Structures/FontChangeSettings';
import { convertParameters } from 'fenix-tools';
import { FontChangeSettingParam } from '../Structures/FontChangeSettingsParam';

let pluginName = "CGT_NametagBasedFontChangerMV";

let params = PluginManager.parameters(pluginName);
let parsedParams = convertParameters(params);
let arrOfExactParams: FontChangeSettingParam[] = parsedParams['Font Change Settings'];

export let FontChangeSettingArr = FontChangeSettings.ArrFromPluginParamArr(arrOfExactParams);