import { FontChangeSettings } from './FontChangeSettings';
import { paramNames } from '../Shared/Objects';

type IPluginParamsRaw = CGT.NaBaFoCh.IPluginParamsRaw;

/** 
 * Manages the FontChangeSettings entries registered in the plugin. 
 * */
export class EntryManager
{
    /** 
     * Resets this manager's entries based on what's registered in the Plugin Params.
     */
    SetFromPluginParams()
    {
        this.entries.clear();
        let params = CGT.NaBaFoCh.Params;

        for (const paramEl of params.FontChangeSettings)
        {
            this.SetEntry(paramEl.Nametag, paramEl[paramNames.FontFamily]);
        }
    }

    protected entries: Map<string, FontChangeSettings> = new Map<string, FontChangeSettings>();
    get Entries() { return new Map<string, FontChangeSettings>(this.entries); }
    // ^Since we don't want to let clients mess with the actual map directly

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
        let newSettings = new FontChangeSettings();
        newSettings.Nametag = nametag;
        newSettings.FontFamily = fontFamily;
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