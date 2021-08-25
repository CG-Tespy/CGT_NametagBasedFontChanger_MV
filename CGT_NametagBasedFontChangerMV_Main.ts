/*:
* @plugindesc Lets you make it so message box fonts automatically change based on the Yanfly MessageCore nametags they're holding.
* @author CG-Tespy – https://github.com/CG-Tespy
* @help This is version 1.01.06 of this plugin. Tested with RMMV versions 
* 1.5.1 and 1.6.2.
* 
* Requires the CGT CoreEngine MV (v1.01.03+) and the Yanfly MessageCore plugins
* to work.
* 
* Please make sure to credit me (and any of this plugin's contributing coders)
* if you're using this plugin in your game (include the names and webpage links).
* 
* Other contributors:
* FeniXTools - FeniXEngine Contributors
* 
* If you want to edit this plugin, you may be better off editing and 
* building the source: https://github.com/CG-Tespy/CGT_NametagBasedFontChanger_MV
* 
* @param Font Change Settings
* @type struct<CGTNaBaFoChFontChangeSettings>[]
* @default ["{\"Nametag\":\"\",\"Font Family\":\"GameFont\"}"]
* 
*/

/*~struct~CGTNaBaFoChFontChangeSettings:
* 
* @param Nametag
* @default Harold
* @desc Name in the nametag that will trigger this font change.
* 
* @param Font Family
* @default GameFont
* @desc Family name of the font that the message box will switch to, when
* the name window displays the corresponding name.
* 
*/

/*:es
* @plugindesc Te deja hacerlo que las fuentes de los cuadros de diálogo cambian 
* automáticamente, basado en los gafetes Yanfly MessageCore que tienen.
@author CG-Tespy – https://github.com/CG-Tespy
* @help Este es la versión 1.01.06 de este plugin. Lo probé con versiones RMMV 
* 1.5.1 y 1.6.2.
* 
* Necesita el plugin CGT CoreEngine MV (v1.01.03+) y el plugin Yanfly MessageCore
* para funcionar.
* 
* Por favor acredita a mí y los otros programadores colaboradores de este plugin 
* si lo usas en tu juego. Incluye los nombres y (si disponible) los 
* enlaces de web.
* 
* Otros colaboradores:
* FeniXTools - FeniXEngine Colaboradores
* 
* Si quieres editar este plugin, podría ser mejor si los haces por la 
* fuente: https://github.com/CG-Tespy/CGT_NametagBasedFontChanger_MV
* 
* @param Font Change Settings
* @text Ajustes de Cambiar Fuentes
* @type struct<CGTNaBaFoChFontChangeSettings>[]
* @default ["{\"Nametag\":\"\",\"Font Family\":\"GameFont\"}"]
* 
*/

/*~struct~CGTNaBaFoChFontChangeSettings:es
* 
* @param Nametag
* @text Gafete
* @default Harold
* @desc El nombre en el gafete que causará el cambio de fuentes.
* 
* @param Font Family
* @param Familia de Fuentes
* @default GameFont
* @desc El gafete y el cuadro de diálogo cambiará a esta familia de fuentes cuando
* el gafete tiene el nombre correspondiente. 
* 
*/

import { NaBaFoCh } from './_MainSource/_CGT_NametagBasedFontChangerMV_Setup';

let fontChanger = 
{
    NaBaFoCh: NaBaFoCh,
};

Object.assign(CGT, fontChanger);
