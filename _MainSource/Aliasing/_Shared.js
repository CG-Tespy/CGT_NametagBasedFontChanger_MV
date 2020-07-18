import { FontChangeSettings } from '../Structures/FontChangeSettings';
import { NaBaFoCh } from '../NaBaFoCh';
export function ChangeFontAsAppropriate() {
    if (FontAdjusterIsValid(this.fontAdjuster))
        this.fontAdjuster.ApplyTo(this.contents);
}
export function FontAdjusterIsValid(fontAdjuster) {
    return fontAdjuster !== FontChangeSettings.Null && fontAdjuster != null;
}
export function GetFontChangeSettingsFor(nameText) {
    let matchingSettings = undefined;
    let fcSettings = NaBaFoCh.registeredSettings;
    matchingSettings = fcSettings.find(settings => settings.Nametag === nameText);
    return matchingSettings || FontChangeSettings.Null;
}
