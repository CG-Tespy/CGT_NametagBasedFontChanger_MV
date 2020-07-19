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

    static ArrFromPluginParamArr(paramArr: FontChangeSettingParam[]): FontChangeSettings[]
    {
        let settings = [];

        for (let param of paramArr)
        {
            let newSetting = this.FromPluginParam(param);
            settings.push(newSetting);
        }

        return settings;
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