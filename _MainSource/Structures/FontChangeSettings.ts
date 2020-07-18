import { FontChangeSettingParam } from './FontChangeSettingsParam';

export class FontChangeSettings
{
    nametag: string;
    fontFamily: string;

    get Nametag() { return this.nametag; }
    get FontFamily() { return this.fontFamily; }

    set Nametag(value) { this.nametag = value; }
    set FontFamily(value) { this.fontFamily = value; }

    static FromPluginParam(param: FontChangeSettingParam): FontChangeSettings
    {
        let newSetting = new FontChangeSettings();
        newSetting.Nametag = param.Nametag;
        newSetting.FontFamily = param["Font Family"];
        
        return newSetting;
    }

    static ArrFromPluginParamArr(stringifiedArr: string): FontChangeSettings[]
    {
        let arrWithStringifiedSettings: string[] = JSON.parse(stringifiedArr); 
        let rawSettings: FontChangeSettingParam[] = 
        arrWithStringifiedSettings.map(this.StringToParam);

        let Settings = [];

        for (let param of rawSettings)
        {
            let newSetting = this.FromPluginParam(param);
            Settings.push(newSetting);
        }

        return Settings;
    }

    private static StringToParam(stringified: string): FontChangeSettingParam
    {
        return JSON.parse(stringified);
    }

    ApplyTo(contents: Bitmap): void
    {
        contents.fontFace = this.fontFamily;
    }

    IsAppliedTo(contents: Bitmap): boolean
    {
        return contents.fontFace === this.fontFamily;
    }

    static Null = Object.freeze(new FontChangeSettings());

}