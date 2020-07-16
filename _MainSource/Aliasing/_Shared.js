import { FontChangeSettings } from '../Structures/FontChangeSettings';
export function NameWindowIsActive() {
    return Yanfly.nameWindow != null && Yanfly.nameWindow.active;
}
export function ChangeFontAsAppropriate() {
    if (NameWindowIsActive() && FontAdjusterIsValid(this.fontAdjuster))
        this.fontAdjuster.ApplyTo(this.contents);
}
export function FontAdjusterIsValid(fontAdjuster) {
    return fontAdjuster != FontChangeSettings.Null && fontAdjuster != null;
}
