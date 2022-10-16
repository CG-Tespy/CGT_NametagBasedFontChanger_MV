/*:
* @plugindesc Lets you make it so message box fonts automatically change based on the Yanfly MessageCore nametags they're holding.
* @author CG-Tespy – https://github.com/CG-Tespy
* @help This is version 2.01.01 of this plugin. Tested with RMMV versions 
* 1.5.1 and 1.6.2, as well as Yanfly's MessageCore.
* 
* Requires the CGT CoreEngine MV (v1.01.03+) plugin to work.
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
* @param FontChangeSettings
* @type struct<CGTNaBaFoChFontChangeSettings>[]
* @default []

* @param NametagFormats
* @type struct<RegexEntry>[]
* @desc Tells the algorithm what counts as a nametag.
* @default ["{\"Name\":\"AnyColored\",\"RegexAsString\":\"^(\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\][^\\\\n]+(\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\]\",\"Enabled\":\"true\",\"Notes\":\"\\\"This catches any (non-newline) colored text starting from \\\\nthe beginning and ending with a color tag. If any newlines \\\\nare before the ending tag, then this format won't catch\\\\nanything in whatever text the wrapper is working with.\\\\n\\\\nThis is mainly for Yanfly Nametags as shown in the message\\\\nlog, due to how Yanfly's scripts handle those in different\\\\nsituations.\\\"\"}","{\"Name\":\"Normal\",\"RegexAsString\":\"^[^\\\\n]+:((\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\])?\",\"Enabled\":\"true\",\"Notes\":\"\\\"This catches any (non-newline) text starting from the \\\\nbeginning and ending with a colon. If any newlines \\\\nare before the colon, then this format won't catch\\\\nanything in whatever text the wrapper is working with.\\\\n\\\\nWorks with colored text, too.\\\"\"}","{\"Name\":\"SquareBrackets\",\"RegexAsString\":\"^\\\\\\\\[[^\\\\n]+\\\\\\\\]((\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\])?\",\"Enabled\":\"true\",\"Notes\":\"\\\"This catches any (non-newline) text starting from the \\\\nbeginning with an opening square bracket, and ending with \\\\na closing square bracket. If any newlines are before that\\\\nsecond one, then this format won't catch anything in \\\\nwhatever text the wrapper is working with.\\\\n\\\\nWorks with colored text, too.\\\"\"}"]
* 
* 
*/

/*:es
* @plugindesc Te deja hacerlo que las fuentes de los cuadros de diálogo cambian 
* automáticamente, basado en los gafetes Yanfly MessageCore que tienen.
@author CG-Tespy – https://github.com/CG-Tespy
* @help Este es la versión 2.01.01 de este plugin. Lo probé con versiones RMMV 
* 1.5.1 y 1.6.2, y tambien el Yanfly MessageCore.
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
* @default []
* 
* @param NametagFormats
* @text FormatosDeGafete
* @type struct<RegexEntry>[]
* @desc Avise al algorítmo que se vale como gafete.
* @default ["{\"Name\":\"TodosDeColor\",\"RegexAsString\":\"^(\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\][^\\\\n]+(\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\]\",\"Enabled\":\"true\",\"Notes\":\"\\\"Este detecta cualquier texto colorado (no nueva línea)\\\\nempezando por el principio y terminando con un etiqueta\\\\nde color. Si unas nuevas líneas son antes del \\\\netiqueta terminante, pues este formato no detectará\\\\nnada en cualquier texto el ajustelíneas estaba \\\\ntrabajando con.\\\\n\\\\nEste es principalmente para los gafetes Yanfly como\\\\nse enseñan en el registro de mensajes. Es debido a\\\\ncomo los plugins de Yanfly los usan en situaciones\\\\ndiferentes.\\\"\"}","{\"Name\":\"Normal\",\"RegexAsString\":\"^[^\\\\n]+:((\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\])?\",\"Enabled\":\"true\",\"Notes\":\"\\\"Este detecta el texto (no nueva línea) empezando en el\\\\nprincipio y termina con los dos puntos. Si algunas\\\\nnueva líneas son antes de los dos puntos, pues este\\\\nformato no detectará nada en cualquier texto el\\\\najustelíneas estaba trabajando con.\\\\n\\\\nFunciona con el texto colorado tambien.\\\"\"}","{\"Name\":\"SquareBrackets\",\"RegexAsString\":\"^\\\\\\\\[[^\\\\n]+\\\\\\\\]((\\u001b|\\\\\\\\)c\\\\[\\\\d+\\\\])?\",\"Enabled\":\"true\",\"Notes\":\"\\\"Este detecta cualquier texto (no nueva línea)\\\\nempezando del principio con un corchete inicial,\\\\ny terminando con un corchete final. Si alguna nueva\\\\nlínea estaba antes del corchete final, pues este formato\\\\nno detectará nada en cualquier texto el ajustelíneas\\\\nestaba trabajando con.\\\\n\\\\nFunciona con el texto colorado tambien.\\\"\"}"]
*/

/*~struct~CGTNaBaFoChFontChangeSettings:
* 
* @param Nametag
* @default Harold
* @desc Name in the nametag that will trigger this font change.
* 
* @param FontFamily
* @default GameFont
* @desc Family name of the font that the message box will switch to, when the name window displays the corresponding name.
* 
* @param FontSize
* @type number
* @default 24
* @desc The font size to use when applying this.
*/

/*~struct~CGTNaBaFoChFontChangeSettings:es
* 
* @param Nametag
* @text Gafete
* @default Harold
* @desc El nombre en el gafete que causará el cambio de fuentes.
* 
* @param FontFamily
* @text FamiliaDeFuentes
* @default GameFont
* @desc El gafete y el cuadro de diálogo cambiará a esto cuando el gafete tiene el nombre correspondiente. 
* 
* @param FontSize
* @text TamañoDeFuente
* @type number
* @default 24
* @desc El tamaño de fuente que se usará cuando esto aplique.
*/

/*~struct~RegexEntry:
 * @param Name
 * @type string
 * @default NewRegex
 * 
 * @param RegexAsString
 * @type string
 * 
 * @param Enabled
 * @type boolean
 * @default true
 * @desc Whether or not the algorithm will consider this entry. Default: On
 * 
 * @param Notes
 * @type Note
 */

/*~struct~RegexEntry:es
 * @param Name
 * @text Nombre
 * @type string
 * @default NuevoFormato
 * 
 * @param RegexAsString
 * @text RegexComoTexto
 * @type string
 * 
 * @param Enabled
 * @text Permitido
 * @type boolean
 * @default true
 * @desc Si o no el algoritmo considerará este formato. Por defecto: true
 * 
 * @param Notes
 * @text Notas
 * @type Note
 */

import { NaBaFoCh } from './_MainSource/_CGT_NametagBasedFontChangerMV_Setup';

let fontChanger = 
{
    NaBaFoCh: NaBaFoCh,
};

Object.assign(CGT, fontChanger);
