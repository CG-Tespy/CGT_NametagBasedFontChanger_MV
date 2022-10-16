import { pluginName } from "../Shared/Strings";
import { FontChangeSettings } from "./FontChangeSettings";
import { IPluginParamsRaw as IPluginParamsRaw } from "./Interfaces/IPluginParamsRaw";
import { RegexEntry } from "./RegexEntry";

type IRegexEntry = CGT.NaBaFoCh.IRegexEntry;
type IRegexEntryRaw = CGT.NaBaFoCh.IRegexEntryRaw;
type IFontChangeSettingParamRaw = CGT.NaBaFoCh.IFontChangeSettingParamRaw;

export class PluginParams
{
    static Create()
    {
        let rawParams: IPluginParamsRaw = PluginManager.parameters(pluginName);
        let properParams = this.ConvertParameters(rawParams);
        return properParams;
    }

    protected static ConvertParameters(rawParams: IPluginParamsRaw)
    {
        let rawSettings: IFontChangeSettingParamRaw[] = this.GetRawSettingsParamArr(rawParams);
        let properSettings = FontChangeSettings.ArrFromPluginParamArr(rawSettings);
        
        let rawNametagFormats: IRegexEntryRaw[] = this.GetRawRegexEntryArr(rawParams);
        let properNametagFormats = RegexEntry.ArrFromPluginParamArr(rawNametagFormats);
        
        let pluginParams = new PluginParams();
        pluginParams.FontChangeSettings = properSettings;
        pluginParams.NametagFormats = properNametagFormats;

        return pluginParams;
    }

    protected static GetRawSettingsParamArr(rawParams: IPluginParamsRaw)
    {
        let stringified = rawParams.FontChangeSettings;
        let settingsAsStrings: string[] = JSON.parse(stringified);
        let result: IFontChangeSettingParamRaw[] = [];

        for (const settingStr of settingsAsStrings)
        {
            let parsed: IFontChangeSettingParamRaw = JSON.parse(settingStr);
            result.push(parsed);
        }

        return result;
    }

    protected static GetRawRegexEntryArr(rawParams: IPluginParamsRaw)
    {
        let stringified = rawParams.NametagFormats;
        let entriesAsStrings: string[] = JSON.parse(stringified);
        let result: IRegexEntryRaw[] = [];

        for (const settingStr of entriesAsStrings)
        {
            let parsed: IRegexEntryRaw = JSON.parse(settingStr);
            result.push(parsed);
        }
        return result;
    }

    get FontChangeSettings() { return this.fontChangeSettings; }
    private fontChangeSettings: FontChangeSettings[] = [];
    set FontChangeSettings(value) { this.fontChangeSettings = value || []; }

    get NametagFormats() { return this.nametagFormats; }
    private nametagFormats: IRegexEntry[] = [];
    set NametagFormats(value) { this.nametagFormats = value || []; }

}