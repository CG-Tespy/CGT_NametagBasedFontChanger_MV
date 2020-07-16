let oldNameRefresh = Window_NameBox.prototype.refresh;
Window_NameBox.prototype.refresh = NewNameBoxRefresh;
// This is to make it easier to access the name text as written in
// the Show Text events
function NewNameBoxRefresh(text, position) {
    this.rawNameText = text;
    oldNameRefresh.call(this, text, position);
}
let oldNameFontReset = Window_NameBox.prototype.resetFontSettings;
Window_NameBox.prototype.resetFontSettings = NewNameFontReset;
// Works like the message box's font-resetter, but makes sure not to step
// on other namebox-altering plugins' toes... hopefully
function NewNameFontReset() {
    oldNameFontReset.call(this);
    //ChangeFontAsAppropriate.call(this);
}
