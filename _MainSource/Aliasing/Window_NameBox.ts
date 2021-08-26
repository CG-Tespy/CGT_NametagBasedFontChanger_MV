import { FontChangeSettings } from '../Structures/FontChangeSettings';

let old = 
{
    initialize: Window_NameBox.prototype.initialize,
    refresh: Window_NameBox.prototype.refresh,
    resetFontSettings: Window_NameBox.prototype.resetFontSettings,
    deactivate: Window_NameBox.prototype.deactivate,
};

let Event = CGT.Core.Utils.Event;

let nameBoxChanges = 
{
    nameText: '',
    prevNameText: '',
    NameTextUpdated: new Event(2),
    ShowedUp: new Event(),
    Deactivated: new Event(),
    fontAdjuster: FontChangeSettings.Default,

    initialize(parentWindow: Window_Message)
    {
        old.initialize.call(this, parentWindow);
        this.NameTextUpdated.AddListener(this.OnNameTextChanged, this);
        this.Deactivated.AddListener(this.OnDeactivated, this);
    },

    deactivate()
    {
        old.deactivate.call(this);

        this.Deactivated.Invoke();
    },

    OnNameTextChanged(oldName: string, newName: string)
    {
        let entryManager = CGT.NaBaFoCh.activeEntryManager;
        this.fontAdjuster = entryManager.GetEntryFor(newName);
    },

    OnDeactivated()
    {
        this.fontAdjuster = FontChangeSettings.Default;
    },

    refresh(nameText: string, position: PIXI.Point | PIXI.ObservablePoint): void
    {
        this.UpdateNameText(nameText);
        return old.refresh.call(this, nameText, position);
    },

    UpdateNameText(newNameText: string): void
    {
        this.nameText = newNameText;
        this.NameTextUpdated.Invoke(this.prevNameText, this.nameText);
        this.prevNameText = this.nameText;
    },

    resetFontSettings()
    {
        old.resetFontSettings.call(this);
        FontChangeSettings.UpdateDefault();
        this.fontAdjuster.ApplyTo(this.contents);
    },
};

Object.assign(Window_NameBox.prototype, nameBoxChanges);