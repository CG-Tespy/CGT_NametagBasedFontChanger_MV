
/*:
 * @plugindesc Lets you make it so message box fonts automatically change based on the Yanfly MessageCore nametags they're holding.
 * @author CG-Tespy – https://github.com/CG-Tespy
 * @help This is version 1.01.01 of this plugin. For RMMV versions 1.5.1 and above.
Requires the CGT CoreEngine and Yanfly MessageCore plugins to work.

Please make sure to credit me (and any of this plugin's contributing coders)
if you're using this plugin in your game (include the names and webpage links).

@param Font Change Settings
@type struct<CGTNaBaFoChFontChangeSettings>[]
@default []

*/

/*~struct~CGTNaBaFoChFontChangeSettings:

@param Nametag
@default Harold
@desc Name in the nametag that will trigger this font change.

@param Font Family
@default GameFont

*/

import { NaBaFoCh } from './_MainSource/_CGT_NametagBasedFontChangerMV_Setup';

let pluginNamespace = 
{
    NaBaFoCh: NaBaFoCh,
};

Object.assign(CGT, pluginNamespace);
