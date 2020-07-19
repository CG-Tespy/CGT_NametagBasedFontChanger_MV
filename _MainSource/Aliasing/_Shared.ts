import { FontChangeSettings } from '../Structures/FontChangeSettings';
import { NaBaFoCh } from '../NaBaFoCh';
let ArrayEx = CGT.Core.Extensions.ArrayEx;

export function ChangeFontAsAppropriate()
{
    if (FontAdjusterIsValid(this.fontAdjuster))
        this.fontAdjuster.ApplyTo(this.contents);
}

export function FontAdjusterIsValid(fontAdjuster: FontChangeSettings)
{
    return fontAdjuster !== FontChangeSettings.Null && fontAdjuster != null;
}

export function GetFontChangeSettingsFor(nameText: string)
{
    let matchingSettings: FontChangeSettings = undefined;
    let fcSettings = NaBaFoCh.registeredSettings;
    matchingSettings = ArrayEx.Find(fcSettings, SettingsMatchNametag);

    function SettingsMatchNametag(settings: FontChangeSettings)
    {
        return settings.Nametag === nameText;
    }
    
    return matchingSettings || FontChangeSettings.Null;
}

