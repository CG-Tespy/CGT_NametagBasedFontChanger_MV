
/*:
* @plugindesc Lets you make it so message box fonts automatically change based on the Yanfly MessageCore nametags they're holding.
* @author CG-Tespy – https://github.com/CG-Tespy
* @help This is version 1.01.01 of this plugin. For RMMV versions 1.5.1 and above.
Requires the CGT CoreEngine and Yanfly MessageCore plugins to work.

Please make sure to credit me (and any of this plugin's contributing coders)
if you're using this plugin in your game (include the names and webpage links).

@param Font Change Settings
@type struct<CGT_NaBaFoCh_FontChangeSettings>[]
@default []

*/

/*~struct~CGT-NaBaFoCh-FontChangeSettings:

@param Nametag
@default Harold
@desc Name in the nametag that will trigger this font change.

@param Font Family
@default GameFont

*/

(function () {
    'use strict';

    let oldNameRefresh = Window_NameBox.prototype.refresh;
    Window_NameBox.prototype.refresh = NewNameBoxRefresh;
    // This is to make it easier to access the name text as written in
    // the Show Text events
    function NewNameBoxRefresh(text, position) {
        this.rawNameText = text;
        oldNameRefresh.call(this, text, position);
    }
    let oldNameFontReset = Window_NameBox.prototype.resetFontSettings;
    Window_NameBox.prototype.resetFontSettings = NewNameFontReset;
    // Works like the message box's font-resetter, but makes sure not to step
    // on other namebox-altering plugins' toes... hopefully
    function NewNameFontReset() {
        oldNameFontReset.call(this);
        //ChangeFontAsAppropriate.call(this);
    }

    class FontChangeSettings {
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

    function NameWindowIsActive() {
        return Yanfly.nameWindow != null && Yanfly.nameWindow.active;
    }
    function ChangeFontAsAppropriate() {
        if (NameWindowIsActive() && FontAdjusterIsValid(this.fontAdjuster))
            this.fontAdjuster.ApplyTo(this.contents);
    }
    function FontAdjusterIsValid(fontAdjuster) {
        return fontAdjuster != FontChangeSettings.Null && fontAdjuster != null;
    }

    let oldStartMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = NewStartMessage;
    // This is to register change settings to apply for (usually) later, 
    // when it's time to reset the font. Better than checking for settings
    // during the font-resetting, which would needlessly add a lot of overhead
    function NewStartMessage() {
        oldStartMessage.call(this);
        this.fontAdjuster = GetFontChangeSettingsFor.call(this);
        Yanfly.nameWindow.fontAdjuster = this.fontAdjuster;
    }
    function GetFontChangeSettingsFor() {
        let matchingSettings = undefined;
        if (NameWindowIsActive()) {
            let nameText = Yanfly.nameWindow.rawNameText;
            let fcSettings = NaBaFoCh.registeredSettings;
            matchingSettings = fcSettings.find(settings => settings.Nametag === nameText);
        }
        return matchingSettings || FontChangeSettings.Null;
    }
    let oldMessageFontReset = Window_Message.prototype.resetFontSettings;
    Window_Message.prototype.resetFontSettings = NewMessageFontReset;
    // As mentioned before, it's here that the font gets changed based
    // on the nametag
    function NewMessageFontReset() {
        oldMessageFontReset.call(this);
        ChangeFontAsAppropriate.call(this);
    }

    let pluginName = "CGT_NametagBasedFontChangerMV";
    let params = PluginManager.parameters(pluginName);
    let allInStringifiedArr = params["Font Change Settings"];
    let FontChangeSettingArr = FontChangeSettings.ArrFromPluginParamArr(allInStringifiedArr);

    let NaBaFoCh = {
        registeredSettings: FontChangeSettingArr,
        FontChangeSettings: FontChangeSettings,
    };

    /*:
     * @plugindesc Lets you make it so message box fonts automatically change based on the Yanfly MessageCore nametags they're holding.
     * @author CG-Tespy – https://github.com/CG-Tespy
     * @help This is version 1.01.01 of this plugin. For RMMV versions 1.5.1 and above.
    Requires the CGT CoreEngine and Yanfly MessageCore plugins to work.

    Please make sure to credit me (and any of this plugin's contributing coders)
    if you're using this plugin in your game (include the names and webpage links).

    @param Font Change Settings
    @type struct<CGT_NaBaFoCh_FontChangeSettings>[]
    @default []

    */
    let pluginNamespace = {
        NaBaFoCh: NaBaFoCh,
    };
    Object.assign(CGT, pluginNamespace);

}());
