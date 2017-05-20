module.exports = {
	configureWebpack: config => {
		return {
			resolve: {
				alias: {
					'/src': config.resolve.alias['@']
				}
			}
		};
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:4567'
			}
		}
	}
}