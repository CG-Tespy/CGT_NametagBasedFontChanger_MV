import { FontChangeSettingParam } from './FontChangeSettingsParam';

export class FontChangeSettings
{
    get Nametag() { return this.nametag; }
    get FontFamily() { return this.fontFamily; }

    set Nametag(value) { this.nametag = value; }
    set FontFamily(value) { this.fontFamily = value; }

    constructor(private nametag: string = "", private fontFamily: string = "GameFont")
    {

    }

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

    static MapFromSettingsArr(settingsArr: FontChangeSettings[]): Map<string, FontChangeSettings>
    {
        let mapOfSettings = new Map<string, FontChangeSettings>();

        for (let settingsEl of settingsArr)
        {
            mapOfSettings.set(settingsEl.Nametag, settingsEl);
        }

        return mapOfSettings;
    }

    ApplyTo(contents: Bitmap): void
    {
        contents.fontFace = this.fontFamily;
    }

    static Default = new FontChangeSettings();

    /** 
     * Updates the default font to match the one set for the locale, as per 
     * the Yanfly Message Core's settings 
     * */
    static UpdateDefault()
    {
        let setForChinese = $dataSystem.locale.match(/^zh/);
        let setForKorean = $dataSystem.locale.match(/^ko/);
        let setForEverythingElse = !setForChinese && !setForKorean;

        let fontFamilyToApply = "GameFont";

        if (setForChinese)
            fontFamilyToApply = Yanfly.Param.MSGCNFontName;
        else if (setForKorean)
            fontFamilyToApply = Yanfly.Param.MSGKRFontName;
        else if (setForEverythingElse)
            fontFamilyToApply = Yanfly.Param.MSGFontName;

        this.Default.FontFamily = fontFamilyToApply;
    }

}