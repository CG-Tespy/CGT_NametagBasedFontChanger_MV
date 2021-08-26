import { singleSpace, barCharacter } from '../Shared/Strings';

export function SetEntry(args: string[]): void
{
    let argsCombined = args.join(singleSpace); 
    // ^Since the args by default are separated by spaces in the editor
    
    let nametag = GetNametagFrom(argsCombined);
    let fontFamily = GetFontFamilyNameFrom(argsCombined);

    let entryManager = CGT.NaBaFoCh.activeEntryManager;
    entryManager.SetEntry(nametag, fontFamily);
}

function GetNametagFrom(argsCombined: string)
{
    let whereBarCharIs = argsCombined.indexOf(barCharacter);
    let familyNameFirstLetterIndex = whereBarCharIs + 2;
    // ^Going with + 2 since there's a space right after the bar char, which we do not
    // want to include in this func's output

    return argsCombined.slice(familyNameFirstLetterIndex);
}

function GetFontFamilyNameFrom(argsCombined: string)
{
    let whereBarCharIs = argsCombined.indexOf(barCharacter);
    let whereTheSpaceBeforeThatIs = whereBarCharIs - 1;

    return argsCombined.slice(0, whereTheSpaceBeforeThatIs);
}
