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
            IsAppliedTo(contents: Bitmap): boolean

            static Null: Readonly<FontChangeSettings>;
        }

        interface FontChangeSettingParam
        {
            "Nametag": string;
            "Font Family": string;
        }
    }
    
}