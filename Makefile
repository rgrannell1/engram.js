
# -- Node binaries
BIN           = ./node_modules/.bin
ENGRAM_DOCOPT = engram/cli/engram.js





NODE       = node
NODE_FLAGS = --harmony_destructuring --harmony_rest_parameters

# -- Browserify.

BROWSERIFY       = $(BIN)/browserify
BROWSERIFY_FLAGS = -t es6ify

# -- Mocha.

_MOCHA      = $(BIN)/_mocha
MOCHA       = $(BIN)/mocha
MOCHA_FLAGS = $(NODE_FLAGS)

# -- Istanbul.

ISTANBUL = $(BIN)/istanbul

# -- Babel.

BABEL        = $(BIN)/babel
BABEL_FLAGS  =

# -- Bunyan.
BUNYAN       = $(BIN)/bunyan

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

SERVER_PATH     = node_modules/engram

CLIENT_ES5_PATH = public/javascript/es5
CLIENT_ES6_PATH = public/javascript/es6

CLIENT_LIB_PATH = public/javascript/lib

SERVER_TEST_PATH = node_modules/engram/test

LOGS_PATH        = log
CERTS_PATH       = certs
DATA_PATH        = data

SASS_PATH = public/sass





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

CLIENT_DEP_IS_PATH             = public/javascript/es5/dependency-is.js
CLIENT_DEP_MITHRIL_PATH        = public/javascript/es5/dependency-mithril.js
CLIENT_DEP_JQUERY_PATH         = public/javascript/es5/dependency-jquery.js










.PHONY: clean all install nodemon eslint jshint test wipe start infostart debugstart





all: build

ALL_TGT = $(ALL_CLIENT_TGT) $(CLIENT_BUNDLE_TGT) $(TEST_BUNDLE_TGT) $(CLIENT_DEP_IS_PATH) $(CLIENT_DEP_MITHRIL_PATH) $(CLIENT_DEP_JQUERY_PATH)





# ==== ==== ==== ==== Setup ==== ==== ==== ==== #

# -- build and install npm dependencies.

install:
	sudo npm install

# -- compile source code.

build: es6ify-client browserify-client install-dependencies browserify-client-test cssify-client setup-fs





# ==== ==== ==== ==== Running Engram ==== ==== ==== ==== #

# -- Start Engram.

start: all
	$(NODE) $(NODE_FLAGS) $(ENGRAM_DOCOPT)

infostart: all
	$(NODE) $(NODE_FLAGS) $(ENGRAM_DOCOPT) run | $(BUNYAN)

debugstart: all
	$(NODE) $(NODE_FLAGS) $(ENGRAM_DOCOPT) run | $(BUNYAN) --level trace




# ==== ==== ==== ==== Compile ES6 -> ES6 ==== ==== ==== ==== #

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




# ==== ==== ==== ==== Install Client Dependencies ==== ==== ==== ==== #

# -- download dependencies

install-dependencies: $(CLIENT_DEP_IS_PATH) $(CLIENT_DEP_MITHRIL_PATH) $(CLIENT_DEP_JQUERY_PATH)

$(CLIENT_DEP_IS_PATH):
	wget -O $@ $(URL_IS)

$(CLIENT_DEP_MITHRIL_PATH):
	wget -O $@ $(URL_MITHRIL)

$(CLIENT_DEP_JQUERY_PATH):
	wget -O $@ $(URL_JQUERY)





# ==== ==== ==== ==== Bundle client code ==== ==== ==== ==== #

browserify: browserify-client browserify-client-test

browserify-client: es6ify-client $(CLIENT_BUNDLE_TGT)

$(CLIENT_BUNDLE_TGT): $(CLIENT_BUNDLE_SRC)

	# Make: build client test bundle

	mkdir -p $(@D)
	$(BROWSERIFY) $< --outfile $@





browserify-client-test: es6ify-client $(TEST_BUNDLE_TGT)

$(TEST_BUNDLE_TGT): $(TEST_BUNDLE_SRC)

	# Make: Build public test bundle.

	mkdir -p $(@D)
	$(BROWSERIFY) $< --outfile $@





# ==== ==== ==== ==== Code Validation ==== ==== ==== ==== #

jshint:

	# Make: JShint

	$(JSHINT) $(JSHINT_FLAGS) $(SERVER_PATH)

eslint: eslint-client eslint-server

eslint-client:
	$(ESLINT) $(ESLINT_FLAGS) $(CLIENT_ES6_PATH)

eslint-server:
	$(ESLINT) $(ESLINT_FLAGS) $(SERVER_PATH)



# ==== ==== ==== ==== CSS ==== ==== ==== ==== #

cssify-client: $(SASS_TGT)

$(SASS_TGT): $(SASS_SRC)

	# Make: build public css.

	mkdir -p public/css
	$(SASS) $(SASS_FLAGS) $< > $@





# ==== ==== ==== ==== Testing ==== ==== ==== ==== #

# -- Run the mocha tests.

test: test-server test-karma

	# Make: Run client and server tests.

test-server: build

	# Make: Run server tests.

	$(MOCHA) $(MOCHA_FLAGS) $(SERVER_TEST_PATH)

test-karma: build

	$(KARMA) start





list-deps:
	@find engram/ -name \*.js | \
	xargs cat | \
	egrep -o 'require\(([^\(.]+)\)' | \
	sort -u | \
	sed -E 's/require//g' | \
	sed -E 's/^..//g'



coverage: coverage-server

coverage-server: build
	$(ISTANBUL) cover $(_MOCHA) -- $(SERVER_TEST_PATH) -R spec	--	recursive test





setup-fs:
	-mkdir -p $(LOGS_PATH)
	-mkdir -p $(CERTS_PATH)
	-mkdir -p $(DATA_PATH)





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
