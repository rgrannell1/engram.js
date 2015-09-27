




.PHONY: clean build nodemon eslint jshint test wipe start bunstart bundbstart





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





# -- PATHS -- #

SERVER_ES5_PATH = node_modules/engram/es5
SERVER_ES6_PATH = node_modules/engram/es6

PUBLIC_ES5_PATH = public/javascript/es5
PUBLIC_ES6_PATH = public/javascript/es6

SERVER_TEST_ES6_PATH = node_modules/engram/test/es6
SERVER_TEST_ES5_PATH = node_modules/engram/test/es5

BIN_ES6_PATH = bin/es6
BIN_ES5_PATH = bin/es5

SASS_PATH = public/sass
CSS_PATH  = public/css

CLIENT_RUNNER_PATH = public-test/runner.html






# -- Engram server/source code.

ENGRAM_SVR_SRC    = $(shell find $(SERVER_ES6_PATH) -name '*.js')
ENGRAM_SVR_TGT    = $(subst es6,es5, $(ENGRAM_SVR_SRC))

# -- Engram public code

ENGRAM_PUBLIC_SRC = $(shell find $(PUBLIC_ES6_PATH) -name '*.js')
ENGRAM_PUBLIC_TGT = $(subst es6,es5, $(ENGRAM_PUBLIC_SRC))

# -- Engram test code

ENGRAM_TEST_SRC   = $(shell find $(SERVER_TEST_ES6_PATH) -name '*.js')
ENGRAM_TEST_TGT   = $(subst es6,es5, $(SERVER_TEST_ES6_PATH))

# -- Engram bin code
ENGRAM_BIN_SRC    = $(shell find $(BIN_ES6_PATH) -name '*.js')
ENGRAM_BIN_TGT    = $(subst es6,es5, $(ENGRAM_BIN_SRC))

ENGRAM_SASS_SRC   = $(shell find $(SASS_PATH) -name '*.sass')
ENGRAM_SASS_TGT   = $(subst sass,css, $(ENGRAM_SASS_SRC))

# -- Browserify bundles
ENGRAM_TEST_BUNDLE_SRC   = public-test/tests/main.js
ENGRAM_PUBLIC_BUNDLE_SRC = $(PUBLIC_ES5_PATH)/main.js

ENGRAM_TEST_BUNDLE_TGT   = public-test/bundle.js
ENGRAM_PUBLIC_BUNDLE_TGT = $(PUBLIC_ES5_PATH)/bundle.js





# -- build all js source code.

build: $(ENGRAM_SVR_TGT) $(ENGRAM_TEST_TGT) $(ENGRAM_PUBLIC_TGT) $(ENGRAM_BIN_TGT) $(ENGRAM_SASS_TGT) $(ENGRAM_PUBLIC_TGT) $(ENGRAM_PUBLIC_BUNDLE_TGT) $(ENGRAM_TEST_BUNDLE_TGT)







# -- build server source code
$(ENGRAM_SVR_TGT): $(ENGRAM_SVR_SRC)

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@





# -- Build server test code.
$(ENGRAM_TEST_TGT): $(ENGRAM_TEST_SRC)

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

$(ENGRAM_BIN_TGT): $(ENGRAM_BIN_SRC)

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@

# -- Build public css.

$(ENGRAM_SASS_TGT): $(ENGRAM_SASS_SRC)
	$(SASS) $(SASS_FLAGS) $< $@





# -- Code linters.

jshint: build
	$(JSHINT) $(JSHINT_FLAGS) $(SERVER_ES6_PATH)

eslint: build
	$(ESLINT) $(ESLINT_FLAGS) $(SERVER_ES6_PATH)





# -- Run the mocha tests.

test: test-client test-server

test-client: build
	$(CHROME) $(CLIENT_RUNNER_PATH) &

test-server: build
	$(MOCHA) $(MOCHA_FLAGS) $(SERVER_TEST_ES5_PATH)






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
