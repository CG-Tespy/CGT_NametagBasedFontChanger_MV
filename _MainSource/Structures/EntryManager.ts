import { FontChangeSettings } from './FontChangeSettings';
import { convertParameters } from 'fenix-tools';
import { FontChangeSettingParam } from './FontChangeSettingsParam';

/** 
 * Manages the FontChangeSettings entries registered in the plugin. 
 * */
export class EntryManager
{
    protected entries: Map<string, FontChangeSettings> = new Map<string, FontChangeSettings>();
    get Entries() { return new Map<string, FontChangeSettings>(this.entries); }

    /** 
     * Resets this manager's entries based on what's registered in the Plugin Params.
     */
    SetFromPluginParams()
    {
        this.entries.clear();
        let params = this.GetParams();

        for (const paramEl of params)
        {
            this.SetEntry(paramEl.Nametag, paramEl["Font Family"]);
        }
    }

    protected GetParams()
    {
        let pluginName = "CGT_NametagBasedFontChangerMV";
        let params = PluginManager.parameters(pluginName);
        let parsedParams = convertParameters(params);
        let arrOfExactParams: FontChangeSettingParam[] = parsedParams['Font Change Settings'];

        return arrOfExactParams;
    }

    SetEntry(nametag: string, fontFamily: string)
    {
        if (this.HasEntryRegisteredFor(nametag))
            this.UpdateOldEntry(nametag, fontFamily);
        else
            this.AddNewEntryFor(nametag, fontFamily);
    }

    protected HasEntryRegisteredFor(nametag: string)
    {
        return this.entries.get(nametag) != null;
    }

    protected UpdateOldEntry(nametag: string, fontFamily: string)
    {
        let settings = this.entries.get(nametag);
        settings.FontFamily = fontFamily;
    }

    protected AddNewEntryFor(nametag: string, fontFamily: string)
    {
        let newSettings = new FontChangeSettings(nametag, fontFamily);
        this.entries.set(nametag, newSettings);
    }

    GetEntryFor(nametag: string)
    {
        if (this.HasEntryRegisteredFor(nametag))
            return this.entries.get(nametag);
        else 
            return FontChangeSettings.Default;
    }

}