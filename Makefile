install_deps:
	#$(npm_config_set) strict-ssl false
	#$(npm_config_set) registry $(registry)
	npm install --cache .npm
	npm install --quiet

build:
	npm install
	npm run build

unit-test-coverage:
	npm run test-coverage