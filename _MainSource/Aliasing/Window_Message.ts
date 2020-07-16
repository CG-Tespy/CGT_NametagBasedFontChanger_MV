import { FontChangeSettings } from '../Structures/FontChangeSettings';
import { NaBaFoCh } from '../_CGT_NametagBasedFontChangerMV_Setup';
import { NameWindowIsActive, ChangeFontAsAppropriate } from './_Shared';

let oldStartMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = NewStartMessage;

// This is to register change settings to apply for (usually) later, 
// when it's time to reset the font. Better than checking for settings
// during the font-resetting, which would needlessly add a lot of overhead
function NewStartMessage()
{
    oldStartMessage.call(this);
    this.fontAdjuster = GetFontChangeSettingsFor.call(this);
    Yanfly.nameWindow.fontAdjuster = this.fontAdjuster;
}

function GetFontChangeSettingsFor(): FontChangeSettings
{
    let matchingSettings: FontChangeSettings = undefined;

    if (NameWindowIsActive())
    {
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
function NewMessageFontReset()
{
    oldMessageFontReset.call(this);
    ChangeFontAsAppropriate.call(this);
}

