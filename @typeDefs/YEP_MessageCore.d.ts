declare class Window_NameBox extends Window_Base
{
    rawNameText: string; 
    fontAdjuster: CGT.NaBaFoCh.FontChangeSettings; 
    // ^ These were added to the class through aliasing
    refresh(text: string, position: PIXI.Point | PIXI.ObservablePoint): void;
}

declare namespace Yanfly
{
    
    let nameWindow: Window_NameBox;
}