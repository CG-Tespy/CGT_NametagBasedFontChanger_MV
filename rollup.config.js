import resolve from 'rollup-plugin-node-resolve';

export default {
	input: "./CGT_NametagBasedFontChangerMV_Main.js",
	output: 
	{
		file: "./CGT_NametagBasedFontChangerMV.js",
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