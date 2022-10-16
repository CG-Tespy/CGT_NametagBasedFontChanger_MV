import { emptyString, globalCaseInsensitive } from "../Shared/Strings";

type IRegexEntryRaw = CGT.NaBaFoCh.IRegexEntryRaw;

export class RegexEntry 
{
    static FromPluginParam(raw: IRegexEntryRaw)
    {
        let result = new RegexEntry();
        result.Name = raw.Name;
        result.RegexAsString = raw.RegexAsString;
        result.Regex = new RegExp(raw.RegexAsString, globalCaseInsensitive);
        result.Enabled = raw.Enabled === 'true';
    }

    get Name(): string { return this.name; }
    private name: string = emptyString;
    set Name(value) { this.name = value || emptyString; }

    get RegexAsString(): string { return this.regexAsString; }
    private regexAsString: string = emptyString;
    set RegexAsString(value) { this.regexAsString = value || emptyString; }

    get Regex(): RegExp { return this.regex; }
    private regex: RegExp = null;
    set Regex(value) { this.regex = value; }

    get Enabled(): boolean { return this.enabled; }
    private enabled: boolean = false;
    set Enabled(value) { this.enabled = value; }

    static ArrFromPluginParamArr(rawArr: IRegexEntryRaw[])
    {
        let result = [];

        for (const rawEl of rawArr)
        {
            let newEntry = this.FromPluginParam(rawEl);
            result.push(newEntry);
        }

        return result;
    }

}