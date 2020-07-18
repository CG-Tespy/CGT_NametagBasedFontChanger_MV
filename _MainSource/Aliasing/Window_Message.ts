import { FontChangeSettings } from '../Structures/FontChangeSettings';
import { ChangeFontAsAppropriate, GetFontChangeSettingsFor } from './_Shared';

let old = 
{
    startMessage: Window_Message.prototype.startMessage,
    resetFontSettings: Window_Message.prototype.resetFontSettings,
    createSubWindows: Window_Message.prototype.createSubWindows,
};

let messageBoxChanges = 
{
    fontAdjuster: FontChangeSettings.Null,

    createSubWindows(): void
    {
        old.createSubWindows.call(this);
        this.ListenForNameWindowEvents();
    },

    ListenForNameWindowEvents(): void
    {
        let nameWindow = Yanfly.nameWindow;
        nameWindow.DisplayedNewName.AddListener(this.OnDisplayNewName, this);
        nameWindow.Deactivated.AddListener(this.OnNameWindowDeactivated, this);
    },

    OnDisplayNewName(oldName: string, newName: string): void
    {
        this.fontAdjuster = GetFontChangeSettingsFor(newName);
    },

    OnNameWindowDeactivated(): void
    {
        this.fontAdjuster = FontChangeSettings.Null;
    },

    resetFontSettings(): void
    {
        old.resetFontSettings.call(this);
        ChangeFontAsAppropriate.call(this);
    },
    
};

Object.assign(Window_Message.prototype, messageBoxChanges);