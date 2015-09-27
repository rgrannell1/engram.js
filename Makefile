
# -- Node binaries
BIN           = ./node_modules/.bin
ENGRAM_DOCOPT = ./bin/es5/docopt-engram.js





NODE = node



# -- Chrome

CHROME = chromium-browser

# -- Browserify.

BROWSERIFY       = $(BIN)/browserify
BROWSERIFY_FLAGS = -t es6ify

# -- Mocha.

MOCHA       = $(BIN)/mocha
MOCHA_FLAGS =

# -- Babel.

BABEL        = $(BIN)/babel
BABEL_FLAGS  =

# -- Bunyan.
BUNYAN       = bunyan

# -- JS Hint.

JSHINT       = $(BIN)/jshint
JSHINT_FLAGS = --config config/jshint-config.json

# -- eslint

ESLINT       = $(BIN)/eslint
ESLINT_FLAGS = --config config/eslint-config.json

# -- Sass

SASS       = sass
SASS_FLAGS =










# -- PATHS

SERVER_ES5_PATH = node_modules/engram/es5
SERVER_ES6_PATH = node_modules/engram/es6

PUBLIC_ES5_PATH = public/javascript/es5
PUBLIC_ES6_PATH = public/javascript/es6





# -- Engram server/source code.

ENGRAM_SVR_SRC    = $(shell find $(SERVER_ES6_PATH) -name '*.js')
ENGRAM_SVR_TGT    = $(subst es6,es5, $(ENGRAM_SVR_SRC))

# -- Engram public code

ENGRAM_PUBLIC_SRC = $(shell find $(PUBLIC_ES6_PATH) -name '*.js')
ENGRAM_PUBLIC_TGT = $(subst es6,es5, $(ENGRAM_PUBLIC_SRC))

# -- Engram test code

ENGRAM_TEST_SRC   = $(wildcard node_modules/engram/test/es6/*.js)
ENGRAM_TEST_TGT   = $(ENGRAM_TEST_SRC:node_modules/engram/test/es6/%.js=node_modules/engram/test/es5/%.js)

ENGRAM_PUBLIC_TEST_TGT = $(wildcard public-test/tests/*.js)

# -- Engram bin code
ENGRAM_BIN_SRC    = $(wildcard bin/es6/*.js)
ENGRAM_BIN_TGT    = $(ENGRAM_BIN_SRC:bin/es6/%.js=bin/es5/%.js)

ENGRAM_SASS_SRC   = $(wildcard public/sass/*.sass)
ENGRAM_SASS_TGT   = $(ENGRAM_SASS_SRC:public/sass/%.sass=public/css/%.css)

# -- Browserify bundles
ENGRAM_TEST_BUNDLE_SRC   = public-test/tests/main.js
ENGRAM_PUBLIC_BUNDLE_SRC = $(PUBLIC_ES5_PATH)/main.js

ENGRAM_TEST_BUNDLE_TGT   = public-test/bundle.js
ENGRAM_PUBLIC_BUNDLE_TGT = $(PUBLIC_ES5_PATH)/bundle.js








.PHONY: clean build nodemon eslint jshint test wipe start bunstart bundbstart










# -- build all js source code.

build: $(ENGRAM_SVR_TGT) $(ENGRAM_TEST_TGT) $(ENGRAM_PUBLIC_TGT) $(ENGRAM_BIN_TGT) $(ENGRAM_SASS_TGT) $(ENGRAM_PUBLIC_TGT) $(ENGRAM_PUBLIC_BUNDLE_TGT) $(ENGRAM_TEST_BUNDLE_TGT)








$(SERVER_ES5_PATH): $(ENGRAM_SVR_TGT)
$(SERVER_ES5_PATH)/%.js: node_modules/engram/es6/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@





# -- Build server test code.

node_modules/engram/test/es5: $(ENGRAM_TEST_TGT)
node_modules/engram/test/es5/%.js: node_modules/engram/test/es6/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@





# -- Build public test bundle

$(ENGRAM_TEST_BUNDLE_TGT): $(ENGRAM_TEST_BUNDLE_SRC)
	# -- todo replace with proper browserify code, main runner module.
	# -- add requirement for other bundle module.

	mkdir -p $(@D)
	$(BROWSERIFY) $< --outfile $@





# -- Build client source code.
$(ENGRAM_PUBLIC_TGT): $(ENGRAM_PUBLIC_SRC)

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@





# -- Build client test bundle

$(ENGRAM_PUBLIC_BUNDLE_TGT): $(ENGRAM_PUBLIC_BUNDLE_SRC)

	mkdir -p $(@D)
	$(BROWSERIFY) $< --outfile $@




# -- Build bin source code.

bin/es5: $(ENGRAM_BIN_TGT)
bin/es5/%.js: bin/es6/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@




# -- Build public css.

public/css:
public/css/%.css: public/sass/%.sass

	$(SASS) $(SASS_FLAGS) $< $@




# -- Code linters.

jshint: build
	$(JSHINT) $(JSHINT_FLAGS) node_modules/engram/es6

eslint: build
	$(ESLINT) $(ESLINT_FLAGS) node_modules/engram/es6





# -- Run the mocha tests.

test: test-client test-server

test-client: build
	$(CHROME) public-test/runner.html &

test-server: build
	$(MOCHA) $(MOCHA_FLAGS) node_modules/engram/test/es5






# -- Remove all ES5.

clean:
	@rm $(ENGRAM_SVR_TGT)
	@rm $(ENGRAM_TEST_TGT)
	@rm $(ENGRAM_BIN_TGT)
	@rm $(ENGRAM_PUBLIC_BUNDLE_TGT)
	@rm $(ENGRAM_TEST_BUNDLE_TGT)




# -- Remove Engram database or logs.

wipe: build
	$(NODE) $(ENGRAM_DOCOPT) wipe db
	$(NODE) $(ENGRAM_DOCOPT) wipe logs





# -- Start Engram.

start: build
	$(NODE) $(ENGRAM_DOCOPT)

bunstart: build
	$(NODE) $(ENGRAM_DOCOPT) | $(BUNYAN)

bundbstart: build
	$(NODE) $(ENGRAM_DOCOPT) | $(BUNYAN) --level DEBUG
