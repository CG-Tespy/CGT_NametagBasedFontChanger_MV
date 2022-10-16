import resolve from 'rollup-plugin-node-resolve';

export default {
	input: "./CGT_NametagBasedFontChangerMV_Main.js",
	output: 
	{
		file: "./CGT_NametagBasedFontChanger_MV.js",
		format: 'iife',
		freeze: false,
	},

	plugins: [
		resolve({
		  jsnext: true,
		  module: true
		}
		)
	  ]
	
};