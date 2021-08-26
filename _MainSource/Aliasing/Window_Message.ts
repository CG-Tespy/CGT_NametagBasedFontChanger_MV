import { FontChangeSettings } from '../Structures/FontChangeSettings';

let old = 
{
    startMessage: Window_Message.prototype.startMessage,
    resetFontSettings: Window_Message.prototype.resetFontSettings,
    createSubWindows: Window_Message.prototype.createSubWindows,
};

let messageBoxChanges = 
{
    fontAdjuster: FontChangeSettings.Default,

    createSubWindows(): void
    {
        old.createSubWindows.call(this);
        this.ListenForNameWindowEvents();
    },

    ListenForNameWindowEvents(): void
    {
        let nameWindow = Yanfly.nameWindow;
        nameWindow.NameTextUpdated.AddListener(this.OnDisplayNewName, this);
        nameWindow.Deactivated.AddListener(this.OnNameWindowDeactivated, this);
    },

    OnDisplayNewName(oldName: string, newName: string): void
    {
        let entryManager = CGT.NaBaFoCh.activeEntryManager;
        this.fontAdjuster = entryManager.GetEntryFor(newName);
    },

    OnNameWindowDeactivated(): void
    {
        this.fontAdjuster = FontChangeSettings.Default;
    },

    resetFontSettings(): void
    {
        old.resetFontSettings.call(this);
        FontChangeSettings.UpdateDefault();
        this.fontAdjuster.ApplyTo(this.contents);
    },
    
};

Object.assign(Window_Message.prototype, messageBoxChanges);