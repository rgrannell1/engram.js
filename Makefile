
# -- Node binaries
BIN           = ./node_modules/.bin
ENGRAM_DOCOPT = ./bin/docopt-engram.js





NODE       = node
NODE_FLAGS = --harmony_destructuring

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

# -- Karma

KARMA = ./node_modules/karma/bin/karma




URL_IS      = https://raw.githubusercontent.com/rgrannell1/is/master/lib/is-min.js
URL_MITHRIL = https://cdnjs.cloudflare.com/ajax/libs/mithril/0.2.0/mithril.min.js
URL_JQUERY  = http://code.jquery.com/jquery-2.1.4.min.js





# -- PATHS -- #

SERVER_ES5_PATH = node_modules/engram/es5
SERVER_ES6_PATH = node_modules/engram/es6

CLIENT_ES5_PATH = public/javascript/es5
CLIENT_ES6_PATH = public/javascript/es6

CLIENT_LIB_PATH = public/javascript/lib

SERVER_TEST_ES6_PATH = node_modules/engram/test/es6
SERVER_TEST_ES5_PATH = node_modules/engram/test/es5

SASS_PATH = public/sass
CSS_PATH  = public/css

CLIENT_RUNNER_PATH = public-test/runner.html





# -- Engram test code

ENGRAM_TEST_SRC   = $(shell find $(SERVER_TEST_ES6_PATH) -name '*.js')
ENGRAM_TEST_TGT   = $(subst es6,es5, $(ENGRAM_TEST_SRC))

# -- Sass source code

ENGRAM_SASS_SRC   = $(shell find $(SASS_PATH) -name '*.sass')
ENGRAM_SASS_TGT   = $(subst sass,css, $(ENGRAM_SASS_SRC))

# -- Browserify bundles
ENGRAM_TEST_BUNDLE_SRC   = public-test/tests/main.js
ENGRAM_TEST_BUNDLE_TGT   = public-test/bundle.js

ENGRAM_CLIENT_BUNDLE_SRC = $(CLIENT_ES5_PATH)/main.js
ENGRAM_CLIENT_BUNDLE_TGT = $(CLIENT_ES5_PATH)/bundle.js





# -- Engram public code

ENGRAM_ALL_CLIENT_SRC = $(shell find $(CLIENT_ES6_PATH) -name '*.js')
ENGRAM_ALL_CLIENT_TGT = $(subst es6,es5, $(ENGRAM_ALL_CLIENT_SRC))


ENGRAM_CLIENT_CONTROLLER_SRC_PATH = $(CLIENT_ES6_PATH)/controller
ENGRAM_CLIENT_MODEL_SRC_PATH      = $(CLIENT_ES6_PATH)/model
ENGRAM_CLIENT_VIEW_SRC_PATH       = $(CLIENT_ES6_PATH)/view
ENGRAM_CLIENT_SRC_PATH            = $(CLIENT_ES6_PATH)

ENGRAM_CLIENT_CONTROLLER_TGT_PATH = $(CLIENT_ES5_PATH)/controller
ENGRAM_CLIENT_MODEL_TGT_PATH      = $(CLIENT_ES5_PATH)/model
ENGRAM_CLIENT_VIEW_TGT_PATH       = $(CLIENT_ES5_PATH)/view
ENGRAM_CLIENT_TGT_PATH            = $(CLIENT_ES5_PATH)

ENGRAM_CLIENT_DEPENDENCY_PATH     = public/javascript/lib





.PHONY: clean all install nodemon eslint jshint test wipe start bunstart bundbstart





all: es6ify-client es6ify-server add-client-dependencies browserify-client cssify-client

ALL_TGT = $(ENGRAM_ALL_CLIENT_TGT) $(ENGRAM_CLIENT_BUNDLE_TGT) $(ENGRAM_TEST_BUNDLE_TGT) $(ENGRAM_CLIENT_LIB_TGT) $(ENGRAM_CLIENT_LIB_SRC)





# ==== ==== ==== ==== Setup ==== ==== ==== ==== #

# -- build and install npm dependencies.

install: build
	sudo npm install

# -- compile source code.

build: es6ify-client browserify-client add-client-dependencies es6ify-server browserify-client-test cssify-client install-dependencies





# ==== ==== ==== ==== Running Engram ==== ==== ==== ==== #

# -- Start Engram.

start: all
	$(NODE) $(NODE_FLAGS) $(ENGRAM_DOCOPT)

bunstart: all
	$(NODE) $(NODE_FLAGS) $(ENGRAM_DOCOPT) | $(BUNYAN)

bundbstart: all
	$(NODE) $(NODE_FLAGS) $(ENGRAM_DOCOPT) | $(BUNYAN) --level DEBUG












es6ify-client: $(ENGRAM_ALL_CLIENT_TGT)

$(ENGRAM_CLIENT_CONTROLLER_TGT_PATH)/%.js: $(ENGRAM_CLIENT_CONTROLLER_SRC_PATH)/%.js

	mkdir -p $(@D
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@

$(ENGRAM_CLIENT_MODEL_TGT_PATH)/%.js: $(ENGRAM_CLIENT_MODEL_SRC_PATH)/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@

$(ENGRAM_CLIENT_VIEW_TGT_PATH)/%.js: $(ENGRAM_CLIENT_VIEW_SRC_PATH)/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@

$(ENGRAM_CLIENT_TGT_PATH)/%.js: $(ENGRAM_CLIENT_SRC_PATH)/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@




install-dependencies: install-is install-mithril install-jquery

install-is:
	wget -O $(ENGRAM_CLIENT_DEPENDENCY_PATH)/dependency-is.js $(URL_IS)

install-mithril:
	wget -O $(ENGRAM_CLIENT_DEPENDENCY_PATH)/dependency-mithril.js $(URL_MITHRIL)

install-jquery:
	wget -O $(ENGRAM_CLIENT_DEPENDENCY_PATH)/dependency-jquery.js $(URL_JQUERY)




browserify-client: es6ify-client $(ENGRAM_CLIENT_BUNDLE_TGT)

$(ENGRAM_CLIENT_BUNDLE_TGT): $(ENGRAM_CLIENT_BUNDLE_SRC)

	# Make: build client test bundle

	mkdir -p $(@D)
	$(BROWSERIFY) $< --outfile $@




add-client-dependencies: $(ENGRAM_CLIENT_LIB_TGT)

$(ENGRAM_CLIENT_TGT_PATH)/%.js: $(CLIENT_LIB_PATH)/%.js

	# Make: install library dependencies.

	cp -f $< $@




es6ify-server: $(ENGRAM_TEST_TGT)

$(ENGRAM_TEST_TGT): $(ENGRAM_TEST_SRC)

	# Make: building server test code.

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@




browserify-client-test: es6ify-client $(ENGRAM_TEST_BUNDLE_TGT)

$(ENGRAM_TEST_BUNDLE_TGT): $(ENGRAM_TEST_BUNDLE_SRC)

	# Make: Build public test bundle.

	mkdir -p $(@D)
	$(BROWSERIFY) $< --outfile $@



# ==== ==== ==== ==== Code Validation ==== ==== ==== ==== #

jshint:

	# Make: JShint

	$(JSHINT) $(JSHINT_FLAGS) $(SERVER_ES6_PATH)

eslint:

	# Make: ESHint

	$(ESLINT) $(ESLINT_FLAGS) $(SERVER_ES6_PATH)
	$(ESLINT) $(ESLINT_FLAGS) $(CLIENT_ES6_PATH)




# ==== ==== ==== ==== CSS ==== ==== ==== ==== #

cssify-client: $(ENGRAM_SASS_TGT)

$(ENGRAM_SASS_TGT): $(ENGRAM_SASS_SRC)

	# Make: build public css.

	$(SASS) $(SASS_FLAGS) $< $@





# ==== ==== ==== ==== Testing ==== ==== ==== ==== #

# -- Run the mocha tests.

test: test-client test-server test-karma

	# Make: Run client and server tests.

test-server: build

	# Make: Run server tests.

	$(MOCHA) $(MOCHA_FLAGS) $(SERVER_TEST_ES5_PATH)

test-karma: build

	$(KARMA) start


# ==== ==== ==== ==== Cleanup ==== ==== ==== ==== #

# -- Remove all ES5.

clean:

	@printf "[Clean]"
	-rm $(ALL_TGT)




# -- Remove Engram database or logs.

wipe: all

	# Make: wiping database code and logs.

	$(NODE) $(NODE_FLAGS) $(ENGRAM_DOCOPT) wipe db
	$(NODE) $(NODE_FLAGS) $(ENGRAM_DOCOPT) wipe logs





.DEFAULT_GOAL := all
