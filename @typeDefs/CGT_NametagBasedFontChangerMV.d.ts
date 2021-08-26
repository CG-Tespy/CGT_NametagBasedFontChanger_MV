declare namespace CGT
{
    namespace NaBaFoCh
    {
        class FontChangeSettings
        {
            get Nametag(): string;
            get FontFamily(): string;

            static FromPluginParam(param: FontChangeSettingParam): FontChangeSettings
            static ArrFromPluginParamArr(paramArr: FontChangeSettingParam[]): FontChangeSettings[]

            ApplyTo(contents: Bitmap): void

            static Default: FontChangeSettings;
        }

        interface FontChangeSettingParam
        {
            "Nametag": string;
            "Font Family": string;
        }

        class EntryManager 
        {
            /** 
             * Gets the FontChangeSettings linked to the passed nametag. If such doesn't exist, 
             * this returns FontChangeSettings.Default
             */
            GetEntryFor(nametag: string): FontChangeSettings;

            /** 
             * Registers a new entry with the passed nametag and font family. If there's already
             * an entry with said nametag, the old one just gets updated to use the passed font family.
             */
            SetEntry(nametag: string, fontFamily: string);
        }

        let activeEntryManager: EntryManager;
    }
    
}