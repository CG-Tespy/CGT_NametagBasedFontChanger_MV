export class FontChangeSettings {
    get Nametag() { return this.nametag; }
    get FontFamily() { return this.fontFamily; }
    set Nametag(value) { this.nametag = value; }
    set FontFamily(value) { this.fontFamily = value; }
    static FromPluginParam(param) {
        let newSetting = new FontChangeSettings();
        newSetting.Nametag = param.Nametag;
        newSetting.FontFamily = param["Font Family"];
        return newSetting;
    }
    static ArrFromPluginParamArr(stringifiedArr) {
        let arrWithStringifiedSettings = JSON.parse(stringifiedArr);
        let rawSettings = arrWithStringifiedSettings.map(this.StringToParam);
        let Settings = [];
        for (let param of rawSettings) {
            let newSetting = this.FromPluginParam(param);
            Settings.push(newSetting);
        }
        return Settings;
    }
    static StringToParam(stringified) {
        return JSON.parse(stringified);
    }
    ApplyTo(contents) {
        contents.fontFace = this.fontFamily;
    }
    IsAppliedTo(contents) {
        return contents.fontFace === this.fontFamily;
    }
}
FontChangeSettings.Null = Object.freeze(new FontChangeSettings());
