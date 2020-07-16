import { FontChangeSettings } from '../Structures/FontChangeSettings';

export function NameWindowIsActive(): boolean
{
    return Yanfly.nameWindow != null && Yanfly.nameWindow.active;
}

export function ChangeFontAsAppropriate()
{
    if (NameWindowIsActive() && FontAdjusterIsValid(this.fontAdjuster))
        this.fontAdjuster.ApplyTo(this.contents);
}

export function FontAdjusterIsValid(fontAdjuster: FontChangeSettings)
{
    return fontAdjuster != FontChangeSettings.Null && fontAdjuster != null;
}