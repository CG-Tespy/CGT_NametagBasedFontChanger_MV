import { defaultFontSize } from '../Shared/Numbers';
import { defaultFont, emptyString } from '../Shared/Strings';
import { IFontChangeSettingParamRaw } from './Interfaces/IFontChangeSettingParam';

export class FontChangeSettings
{
    static FromPluginParam(param: IFontChangeSettingParamRaw): FontChangeSettings
    {
        let newSetting = new FontChangeSettings();
        newSetting.Nametag = param.Nametag;
        newSetting.FontFamily = param.FontFamily;
        newSetting.FontSize = Number(param.FontSize);

        return newSetting;
    }

    get Nametag() { return this.nametag; }
    private nametag: string = emptyString;
    set Nametag(value) { this.nametag = value; }

    get FontFamily() { return this.fontFamily; }
    private fontFamily: string = defaultFont;
    set FontFamily(value) { this.fontFamily = value; }

    get FontSize() { return this.fontSize; }
    private fontSize: number = defaultFontSize;
    set FontSize(value) { this.fontSize = value || defaultFontSize; }

    static ArrFromPluginParamArr(paramArr: IFontChangeSettingParamRaw[]): FontChangeSettings[]
    {
        let settings: FontChangeSettings[] = [];

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
        contents.fontSize = this.fontSize;
    }

    static Default = new FontChangeSettings();

    /** 
     * Updates the default font family to match the one set for the locale, as per 
     * the Yanfly Message Core's settings 
     * */
    static UpdateDefault()
    {
        this.Default.FontFamily = defaultFont;

        if (YanflyMessageCoreIsThere())
        {
            let setForChinese = $dataSystem.locale.match(/^zh/);
            let setForKorean = $dataSystem.locale.match(/^ko/);
            let setForEverythingElse = !setForChinese && !setForKorean;

            let fontFamilyToApply = emptyString;

            if (setForChinese)
                fontFamilyToApply = Yanfly.Param.MSGCNFontName;
            else if (setForKorean)
                fontFamilyToApply = Yanfly.Param.MSGKRFontName;
            else if (setForEverythingElse)
                fontFamilyToApply = Yanfly.Param.MSGFontName;

            this.Default.FontFamily = fontFamilyToApply;
        }
    }

}

