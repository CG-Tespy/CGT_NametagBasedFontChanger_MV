(function () {
    'use strict';

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

    let pluginName = "CGT_NametagBasedFontChangerMV";
    let params = PluginManager.parameters(pluginName);
    let allInStringifiedArr = params["Font Change Settings"];
    let FontChangeSettingArr = FontChangeSettings.ArrFromPluginParamArr(allInStringifiedArr);

    let NaBaFoCh = {
        registeredSettings: FontChangeSettingArr,
        FontChangeSettings: FontChangeSettings,
    };

    function ChangeFontAsAppropriate() {
        if (FontAdjusterIsValid(this.fontAdjuster))
            this.fontAdjuster.ApplyTo(this.contents);
    }
    function FontAdjusterIsValid(fontAdjuster) {
        return fontAdjuster !== FontChangeSettings.Null && fontAdjuster != null;
    }
    function GetFontChangeSettingsFor(nameText) {
        let matchingSettings = undefined;
        let fcSettings = NaBaFoCh.registeredSettings;
        matchingSettings = fcSettings.find(settings => settings.Nametag === nameText);
        return matchingSettings || FontChangeSettings.Null;
    }

    let old = {
        initialize: Window_NameBox.prototype.initialize,
        refresh: Window_NameBox.prototype.refresh,
        resetFontSettings: Window_NameBox.prototype.resetFontSettings,
    };
    let Event = CGT.Core.Utils.Event;
    let nameBoxChanges = {
        nameText: '',
        prevNameText: '',
        DisplayedNewName: new Event(2),
        ShowedUp: new Event(),
        Deactivated: new Event(),
        initialize(parentWindow) {
            old.initialize.call(this, parentWindow);
            this.DisplayedNewName.AddListener(this.OnNameTextChanged, this);
            this.Deactivated.AddListener(this.OnDeactivated, this);
        },
        OnNameTextChanged(oldName, newName) {
            this.fontAdjuster = GetFontChangeSettingsFor(newName);
        },
        OnDeactivated() {
            this.fontAdjuster = FontChangeSettings.Null;
        },
        refresh(nameText, position) {
            this.UpdateNameText(nameText);
            return old.refresh.call(this, nameText, position);
        },
        UpdateNameText(newNameText) {
            this.nameText = newNameText;
            if (this.prevNameText !== this.nameText)
                this.DisplayedNewName.Invoke(this.prevNameText, this.nameText);
            this.prevNameText = this.nameText;
        },
        resetFontSettings() {
            old.resetFontSettings.call(this);
            ChangeFontAsAppropriate.call(this);
        },
    };
    Object.assign(Window_NameBox.prototype, nameBoxChanges);

    let old$1 = {
        startMessage: Window_Message.prototype.startMessage,
        resetFontSettings: Window_Message.prototype.resetFontSettings,
        createSubWindows: Window_Message.prototype.createSubWindows,
    };
    let messageBoxChanges = {
        fontAdjuster: FontChangeSettings.Null,
        createSubWindows() {
            old$1.createSubWindows.call(this);
            this.ListenForNameWindowEvents();
        },
        ListenForNameWindowEvents() {
            let nameWindow = Yanfly.nameWindow;
            nameWindow.DisplayedNewName.AddListener(this.OnDisplayNewName, this);
            nameWindow.Deactivated.AddListener(this.OnNameWindowDeactivated, this);
        },
        OnDisplayNewName(oldName, newName) {
            this.fontAdjuster = GetFontChangeSettingsFor(newName);
        },
        OnNameWindowDeactivated() {
            this.fontAdjuster = FontChangeSettings.Null;
        },
        resetFontSettings() {
            old$1.resetFontSettings.call(this);
            ChangeFontAsAppropriate.call(this);
        },
    };
    Object.assign(Window_Message.prototype, messageBoxChanges);

    /*:
     * @plugindesc Lets you make it so message box fonts automatically change based on the Yanfly MessageCore nametags they're holding.
     * @author CG-Tespy – https://github.com/CG-Tespy
     * @help This is version 1.01.01 of this plugin. For RMMV versions 1.5.1 and above.
    Requires the CGT CoreEngine and Yanfly MessageCore plugins to work.

    Please make sure to credit me (and any of this plugin's contributing coders)
    if you're using this plugin in your game (include the names and webpage links).

    @param Font Change Settings
    @type struct<CGTNaBaFoChFontChangeSettings>[]
    @default []

    */
    let pluginNamespace = {
        NaBaFoCh: NaBaFoCh,
    };
    Object.assign(CGT, pluginNamespace);

}());
