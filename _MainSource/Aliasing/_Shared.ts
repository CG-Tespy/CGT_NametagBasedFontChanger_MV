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
    let settingsMap = CGT.NaBaFoCh.registeredSettingsMap;
    return settingsMap.get(nameText) || FontChangeSettings.Null;
}

