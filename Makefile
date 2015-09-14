
# -- Node binaries
BIN := ./node_modules/.bin

ENGRAM_DOCOPT ?= ./bin/es5/docopt-engram.js





NODE ?= node





# -- Browserify.

BROWSERIFY       ?= $(BIN)/browserify
BROWSERIFY_FLAGS ?= -t es6ify

# -- Mocha.

MOCHA       ?= $(BIN)/mocha
MOCHA_FLAGS ?=

# -- Babel.

BABEL        ?= $(BIN)/babel
BABEL_FLAGS  ?=

# -- Bunyan.
BUNYAN       ?= bunyan

# -- JS Hint.

JSHINT       ?= $(BIN)/jshint
JSHINT_FLAGS ?= --config ~/Code/jshint/global.json

# -- eslint

ESLINT       ?= $(BIN)/eslint
ESLINT_FLAGS ?= --config config/eslint-config

# -- Sass

SASS       ?= sass
SASS_FLAGS ?=





# -- Engram server/source code.

ENGRAM_SVR_SRC    ?= $(shell find node_modules/engram/es6 -name '*.js')
ENGRAM_SVR_TGT    ?= $(subst es6,es5, $(ENGRAM_SVR_SRC))

# -- Engram public code

ENGRAM_PUBLIC_SRC ?= $(wildcard public/javascript/es6/*.js)
ENGRAM_PUBLIC_TGT ?= $(ENGRAM_PUBLIC_SRC:public/javascript/es6/%.js=public/javascript/es5/%.js)

# -- Engram test code

ENGRAM_TEST_SRC   ?= $(wildcard node_modules/engram/test/es6/*.js)
ENGRAM_TEST_TGT   ?= $(ENGRAM_TEST_SRC:node_modules/engram/test/es6/%.js=node_modules/engram/test/es5/%.js)

ENGRAM_PUBLIC_TEST_TGT ?= $(wildcard public-test/tests/*.js)

# -- Engram bin code
ENGRAM_BIN_SRC    ?= $(wildcard bin/es6/*.js)
ENGRAM_BIN_TGT    ?= $(ENGRAM_BIN_SRC:bin/es6/%.js=bin/es5/%.js)

ENGRAM_SASS_SRC   ?= $(wildcard public/sass/*.sass)
ENGRAM_SASS_TGT   ?= $(ENGRAM_SASS_SRC:public/sass/%.sass=public/css/%.css)










.PHONY: clean build nodemon jshint test wipe start bunstart bundbstart





# -- Build server source code.

node_modules/engram/es5: $(ENGRAM_SVR_TGT)
node_modules/engram/es5/%.js: node_modules/engram/es6/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@





# -- Build server test code.

node_modules/engram/test/es5: $(ENGRAM_TEST_TGT)
node_modules/engram/test/es5/%.js: node_modules/engram/test/es6/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@





# -- Build public test bundle

public-test/bundle.js: public/javascript/es5/main.js $(public-test/tests/%.js)

	# -- todo replace with proper browserify code, main runner module.
	# -- add requirement for other bundle module.

	mkdir -p $(@D)
	$(BROWSERIFY) $< --outfile $@





# -- Build client source code.

public/javascript/es5: $(ENGRAM_PUBLIC_TGT)
public/javascript/es5/%.js: public/javascript/es6/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@





# -- Build client test bundle

public/javascript/es5/bundle.js: public/javascript/es5/main.js

	mkdir -p $(@D)
	$(BROWSERIFY) $< --outfile $@




# -- Build bin source code.

bin/es5: $(ENGRAM_BIN_TGT)
bin/es5/%.js: bin/es6/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@





# -- Build public css.

public/css: $()
public/css/%.css: public/sass/%.sass

	$(SASS) $(SASS_FLAGS) $< $@





# -- build all js source code.

build: $(ENGRAM_SVR_TGT) $(ENGRAM_TEST_TGT) $(ENGRAM_PUBLIC_TGT) $(ENGRAM_BIN_TGT) $(ENGRAM_SASS_TGT) $(ENGRAM_PUBLIC_TGT)
	public/javascript/es5/bundle.js public-test/bundle.js





# -- Code linters

jshint: build
	$(JSHINT) $(JSHINT_FLAGS) node_modules/engram/es6

eslint: build
	$(ESLINT) $(ESLINT_FLAGS) .





# -- Run the mocha tests

test: build
	$(MOCHA) $(MOCHA_FLAGS) node_modules/engram/test/es5





# -- Remove all ES5.

clean:
	@rm $(ENGRAM_SVR_TGT)
	@rm $(ENGRAM_TEST_TGT)
	@rm $(ENGRAM_BIN_TGT)





# -- Remove Engram database or logs

wipe: build
	$(NODE) $(ENGRAM_DOCOPT) wipe db
	$(NODE) $(ENGRAM_DOCOPT) wipe logs





# -- Start Engram

start: build
	$(NODE) $(ENGRAM_DOCOPT)

bunstart: build
	$(NODE) $(ENGRAM_DOCOPT) | $(BUNYAN)

bundbstart: build
	$(NODE) $(ENGRAM_DOCOPT) | $(BUNYAN) --level DEBUG
