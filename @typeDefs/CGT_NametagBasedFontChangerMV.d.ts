declare namespace CGT
{
    namespace NaBaFoCh
    {
        let Params: PluginParamsClass;

        class PluginParamsClass
        {
            get FontChangeSettings(): FontChangeSettings[];
            get NametagFormats(): IRegexEntry[];
        }

        class FontChangeSettings
        {
            get Nametag(): string;
            get FontFamily(): string;
            get FontSize(): number;

            static FromPluginParam(param: IFontChangeSettingParamRaw): FontChangeSettings
            static ArrFromPluginParamArr(paramArr: IFontChangeSettingParamRaw[]): FontChangeSettings[]

            ApplyTo(contents: Bitmap): void

            static Default: FontChangeSettings;
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

        interface IPluginParamsRaw
        {
            FontChangeSettings: string;
            NametagFormats: string;
        }

        interface IRegexEntryRaw
        {
            Name: string;
            RegexAsString: string;
            Enabled: string;
            Notes: string;
        }

        class RegexEntry 
        {
            get Name(): string;
            get RegexAsString(): string;
            get Regex(): RegExp;
            get Enabled(): boolean;

            static FromPluginParam(raw: IRegexEntryRaw): RegexEntry;
            static ArrFromPluginParamArr(raws: IRegexEntryRaw[]): RegexEntry[];
        }

        interface IRegexEntry
        {
            Name: string;
            RegexAsString: string;
            Regex: RegExp;
            Enabled: boolean;
            Notes: string;
        }

        interface IFontChangeSettingParamRaw
        {
            Nametag: string;
            FontFamily: string;
            FontSize: string;
        }


    }
    
}