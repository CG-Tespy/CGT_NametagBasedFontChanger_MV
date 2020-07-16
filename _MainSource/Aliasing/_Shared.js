import { FontChangeSettings } from '../Structures/FontChangeSettings';
import { NaBaFoCh } from '../NaBaFoCh';
export function NameWindowIsActive() {
    return Yanfly.nameWindow != null && Yanfly.nameWindow.active;
}
export function ChangeFontAsAppropriate() {
    if (FontAdjusterIsValid(this.fontAdjuster))
        this.fontAdjuster.ApplyTo(this.contents);
}
export function FontAdjusterIsValid(fontAdjuster) {
    return fontAdjuster != FontChangeSettings.Null && fontAdjuster != null;
}
export function GetFontChangeSettingsFor(nameText) {
    let matchingSettings = undefined;
    if (NameWindowIsActive()) {
        let fcSettings = NaBaFoCh.registeredSettings;
        matchingSettings = fcSettings.find(settings => settings.Nametag === nameText);
    }
    return matchingSettings || FontChangeSettings.Null;
}
