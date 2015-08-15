
# -- Node binaries
BIN := ./node_modules/.bin






# -- Babel.

MOCHA       ?= $(BIN)/mocha
MOCHA_FLAGS ?=




# -- Babel.

BABEL        ?= $(BIN)/babel
BABEL_FLAGS  ?=





# -- JS Hint.

JSHINT            ?= $(BIN)/jshint
JSHINT_FLAGS      ?= --config ~/Code/jshint/global.json






# -- Nodemon

NODEMON       ?= $(BIN)/nodemon
NODEMON_FLAGS ?= --watch node_modules/engram/es5 --watch public/javascript/es5





# -- Sass

SASS       ?= sass
SASS_FLAGS ?=








ROOT ?= "node_modules/engram/es6"





# -- Engram server/source code.

ENGRAM_SVR_SRC    ?= $(wildcard node_modules/engram/es6/*.js)
ENGRAM_SVR_TGT    ?= $(ENGRAM_SVR_SRC:node_modules/engram/es6/%.js=node_modules/engram/es5/%.js)

# -- Engram test code

ENGRAM_TEST_SRC   ?= $(wildcard node_modules/engram/test/es6/*.js)
ENGRAM_TEST_TGT   ?= $(ENGRAM_TEST_SRC:node_modules/engram/test/es6/%.js=node_modules/engram/test/es5/%.js)

# -- Engram public code

ENGRAM_PUBLIC_SRC ?= $(wildcard public/javascript/es6/*.js)
ENGRAM_PUBLIC_TGT ?= $(ENGRAM_PUBLIC_SRC:public/javascript/es6/%.js=public/javascript/es5/%.js)

# -- Engram bin code
ENGRAM_BIN_SRC    ?= $(wildcard bin/es6/*.js)
ENGRAM_BIN_TGT    ?= $(ENGRAM_BIN_SRC:bin/es6/%.js=bin/es5/%.js)

ENGRAM_SASS_SRC   ?= $(wildcard public/sass/*.sass)
ENGRAM_SASS_TGT   ?= $(ENGRAM_SASS_SRC:public/sass/%.sass=public/css/%.css)





.PHONY: clean build nodemon jshint test wipe start bstart
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






# -- Build client source code.

public/javascript/es5: $(ENGRAM_PUBLIC_TGT)
public/javascript/es5/%.js: public/javascript/es6/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@






# -- Build bin source code.

bin/es5: $(ENGRAM_BIN_TGT)
bin/es5/%.js: bin/es6/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@





public/css: $()
public/css/%.css: public/sass/%.sass

	$(SASS) $(SASS_FLAGS) $< $@


# -- build all js source code.

build: $(ENGRAM_SVR_TGT) $(ENGRAM_TEST_TGT) $(ENGRAM_PUBLIC_TGT) $(ENGRAM_BIN_TGT) $(ENGRAM_SASS_TGT)
all: build




# -- watch for any changes to code.

nodemon: build
	$(NODEMON) $(NODEMON_FLAGS) bin/es5/docopt-engram.js





jshint: build
	$(JSHINT) $(JSHINT_FLAGS) node_modules/engram/es6




# -- run the mocha tests

test: build
	$(MOCHA) $(MOCHA_FLAGS) node_modules/engram/test/es5


# -- Remove all ES5.

clean:
	@rm $(ENGRAM_SVR_TGT)
	@rm $(ENGRAM_TEST_TGT)
	@rm $(ENGRAM_BIN_TGT)





wipe: build
	node bin/es5/docopt-engram.js wipe db
	node bin/es5/docopt-engram.js wipe logs





start: build
	npm start

bunstart: build
	npm start | bunyan

bundbstart: build
	npm start | bunyan --level DEBUG

