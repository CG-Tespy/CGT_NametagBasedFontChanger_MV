import { FontChangeSettings } from '../Structures/FontChangeSettings';
import { ChangeFontAsAppropriate, GetFontChangeSettingsFor } from './_Shared';
let old = {
    startMessage: Window_Message.prototype.startMessage,
    resetFontSettings: Window_Message.prototype.resetFontSettings,
    createSubWindows: Window_Message.prototype.createSubWindows,
};
let messageBoxChanges = {
    fontAdjuster: FontChangeSettings.Null,
    createSubWindows() {
        old.createSubWindows.call(this);
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
        old.resetFontSettings.call(this);
        ChangeFontAsAppropriate.call(this);
    },
};
Object.assign(Window_Message.prototype, messageBoxChanges);
