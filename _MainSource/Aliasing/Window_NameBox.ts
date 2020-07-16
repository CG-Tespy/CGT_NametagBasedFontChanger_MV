import { ChangeFontAsAppropriate } from './_Shared';

let old = 
{
    initialize: Window_NameBox.prototype.initialize,
    refresh: Window_NameBox.prototype.refresh,
    resetFontSettings: Window_NameBox.prototype.resetFontSettings,
};

let Event = CGT.Core.Utils.Event;

let nameBoxChanges = 
{
    nameText: '',
    prevNameText: '',
    DisplayedNewName: new Event(2),
    ShowedUp: new Event(),
    Deactivated: new Event(),

    refresh(nameText: string, position: PIXI.Point | PIXI.ObservablePoint): void
    {
        this.UpdateNameText(nameText);
        old.refresh.call(this, nameText, position);
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
        //ChangeFontAsAppropriate.call(this);
    },
};

Object.assign(Window_NameBox.prototype, nameBoxChanges);