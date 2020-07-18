declare class Window_NameBox extends Window_Base
{
    nameText: string; 
    fontAdjuster: CGT.NaBaFoCh.FontChangeSettings; 
    // ^ These were added to the class through aliasing
    refresh(text: string, position: PIXI.Point | PIXI.ObservablePoint): string;

    DisplayedNewName: CGT.Core.Utils.Event;
    ShowedUp: CGT.Core.Utils.Event;
    Deactivated: CGT.Core.Utils.Event;
}

declare namespace Yanfly
{
    
    let nameWindow: Window_NameBox;
}