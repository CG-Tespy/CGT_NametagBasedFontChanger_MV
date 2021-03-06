import { ChangeFontAsAppropriate, GetFontChangeSettingsFor } from './_Shared';
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
    DisplayedNewName: new Event(2),
    ShowedUp: new Event(),
    Deactivated: new Event(),

    initialize(parentWindow: Window_Message)
    {
        old.initialize.call(this, parentWindow);
        this.DisplayedNewName.AddListener(this.OnNameTextChanged, this);
        this.Deactivated.AddListener(this.OnDeactivated, this);
    },

    deactivate()
    {
        old.deactivate.call(this);

        this.Deactivated.Invoke();
    },

    OnNameTextChanged(oldName: string, newName: string)
    {
        this.fontAdjuster = GetFontChangeSettingsFor(newName);
    },

    OnDeactivated()
    {
        this.fontAdjuster = FontChangeSettings.Null;
    },

    refresh(nameText: string, position: PIXI.Point | PIXI.ObservablePoint): void
    {
        this.UpdateNameText(nameText);
        return old.refresh.call(this, nameText, position);
    },

    UpdateNameText(newNameText: string): void
    {
        this.nameText = newNameText;

        if (this.prevNameText !== this.nameText)
            this.DisplayedNewName.Invoke(this.prevNameText, this.nameText);
        
        this.prevNameText = this.nameText;
    },

    resetFontSettings()
    {
        old.resetFontSettings.call(this);
        ChangeFontAsAppropriate.call(this);
    },
};

Object.assign(Window_NameBox.prototype, nameBoxChanges);