
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

TEST_SRC   = $(shell find $(SERVER_TEST_ES6_PATH) -name '*.js')
TEST_TGT   = $(subst es6,es5, $(TEST_SRC))

# -- Sass source code

SASS_SRC   = $(shell find $(SASS_PATH) -name '*.sass')
SASS_TGT   = $(subst sass,css, $(SASS_SRC))

# -- Browserify bundles
TEST_BUNDLE_SRC   = public-test/tests/main.js
TEST_BUNDLE_TGT   = public-test/bundle.js

CLIENT_BUNDLE_SRC = $(CLIENT_ES5_PATH)/main.js
CLIENT_BUNDLE_TGT = $(CLIENT_ES5_PATH)/bundle.js





# -- Engram public code

ALL_CLIENT_SRC = $(shell find $(CLIENT_ES6_PATH) -name '*.js')
ALL_CLIENT_TGT = $(subst es6,es5, $(ALL_CLIENT_SRC))


CLIENT_CONTROLLER_SRC_PATH     = $(CLIENT_ES6_PATH)/controller
CLIENT_MODEL_SRC_PATH          = $(CLIENT_ES6_PATH)/model
CLIENT_VIEW_SRC_PATH           = $(CLIENT_ES6_PATH)/view
CLIENT_SRC_PATH                = $(CLIENT_ES6_PATH)

CLIENT_CONTROLLER_TGT_PATH     = $(CLIENT_ES5_PATH)/controller
CLIENT_MODEL_TGT_PATH          = $(CLIENT_ES5_PATH)/model
CLIENT_VIEW_TGT_PATH           = $(CLIENT_ES5_PATH)/view

CLIENT_DEPENDENCY_IS_PATH      = public/javascript/lib/dependency-is.js
CLIENT_DEPENDENCY_MITHRIL_PATH = public/javascript/lib/dependency-mithril.js
CLIENT_DEPENDENCY_JQUERY_PATH  = public/javascript/lib/dependency-jquery.js










.PHONY: clean all install nodemon eslint jshint test wipe start bunstart bundbstart





all: es6ify-client es6ify-server add-client-dependencies browserify-client cssify-client

ALL_TGT = $(ALL_CLIENT_TGT) $(CLIENT_BUNDLE_TGT) $(TEST_BUNDLE_TGT) $(ENGRAM_CLIENT_LIB_TGT) $(ENGRAM_CLIENT_LIB_SRC)





# ==== ==== ==== ==== Setup ==== ==== ==== ==== #

# -- build and install npm dependencies.

install: build
	sudo npm install

# -- compile source code.

build: es6ify-client browserify-client install-dependencies add-client-dependencies es6ify-server browserify-client-test cssify-client





# ==== ==== ==== ==== Running Engram ==== ==== ==== ==== #

# -- Start Engram.

start: all
	$(NODE) $(NODE_FLAGS) $(ENGRAM_DOCOPT)

bunstart: all
	$(NODE) $(NODE_FLAGS) $(ENGRAM_DOCOPT) | $(BUNYAN)

bundbstart: all
	$(NODE) $(NODE_FLAGS) $(ENGRAM_DOCOPT) | $(BUNYAN) --level DEBUG












es6ify-client: $(ALL_CLIENT_TGT)

$(CLIENT_CONTROLLER_TGT_PATH)/%.js: $(CLIENT_CONTROLLER_SRC_PATH)/%.js

	mkdir -p $(@D
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@

$(CLIENT_MODEL_TGT_PATH)/%.js: $(CLIENT_MODEL_SRC_PATH)/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@

$(CLIENT_VIEW_TGT_PATH)/%.js: $(CLIENT_VIEW_SRC_PATH)/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@

$(CLIENT_ES5_PATH)/%.js: $(CLIENT_SRC_PATH)/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@




install-dependencies:

$(CLIENT_DEPENDENCY_IS_PATH):
	wget -O $@ $(URL_IS)

$(CLIENT_DEPENDENCY_MITHRIL_PATH):
	wget -O $@ $(URL_MITHRIL)

$(CLIENT_DEPENDENCY_JQUERY_PATH):
	wget -O $@ $(URL_JQUERY)




browserify-client: es6ify-client $(CLIENT_BUNDLE_TGT)

$(CLIENT_BUNDLE_TGT): $(CLIENT_BUNDLE_SRC)

	# Make: build client test bundle

	mkdir -p $(@D)
	$(BROWSERIFY) $< --outfile $@



# == todo
add-client-dependencies: $(CLIENT_DEPENDENCY_IS_PATH) $(CLIENT_DEPENDENCY_MITHRIL_PATH) $(CLIENT_DEPENDENCY_JQUERY_PATH)


$(CLIENT_TGT_PATH)/%.js: $(CLIENT_LIB_PATH)/%.js

	# Make: install library dependencies.

	cp -f $< $@




es6ify-server: $(TEST_TGT)

$(TEST_TGT): $(TEST_SRC)

	# Make: building server test code.

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@




browserify-client-test: es6ify-client $(TEST_BUNDLE_TGT)

$(TEST_BUNDLE_TGT): $(TEST_BUNDLE_SRC)

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

cssify-client: $(SASS_TGT)

$(SASS_TGT): $(SASS_SRC)

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
