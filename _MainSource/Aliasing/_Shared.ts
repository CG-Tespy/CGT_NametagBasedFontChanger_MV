import { FontChangeSettings } from '../Structures/FontChangeSettings';
import { NaBaFoCh } from '../NaBaFoCh';

export function NameWindowIsActive(): boolean
{
    return Yanfly.nameWindow != null && Yanfly.nameWindow.active;
}

export function ChangeFontAsAppropriate()
{
    if (FontAdjusterIsValid(this.fontAdjuster))
        this.fontAdjuster.ApplyTo(this.contents);
}

export function FontAdjusterIsValid(fontAdjuster: FontChangeSettings)
{
    return fontAdjuster != FontChangeSettings.Null && fontAdjuster != null;
}

export function GetFontChangeSettingsFor(nameText: string)
{
    let matchingSettings: FontChangeSettings = undefined;
    let fcSettings = NaBaFoCh.registeredSettings;
    matchingSettings = fcSettings.find(settings => settings.Nametag === nameText);
    
    return matchingSettings || FontChangeSettings.Null;
}