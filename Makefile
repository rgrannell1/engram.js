
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




# -- Engram server/source code.

ENGRAM_SVR_SRC    ?= $(wildcard node_modules/engram/es6/*.js)
ENGRAM_SVR_TGT    ?= $(ENGRAM_SVR_SRC:node_modules/engram/es6/%.js=node_modules/engram/es5/%.js)

# -- Engram test code

ENGRAM_TEST_SRC   ?= $(wildcard node_modules/engram/test/es6/*.js)
ENGRAM_TEST_TGT   ?= $(ENGRAM_TEST_SRC:node_modules/engram/test/es6/%.js=node_modules/engram/test/es5/%.js)

# -- Engram public code

ENGRAM_PUBLIC_SRC ?= $(wildcard public/javascript/es6/*.js)
ENGRAM_PUBLIC_TGT ?= $(ENGRAM_PUBLIC_SRC:public/javascript/es6/%.js=public/javascript/es5/%.js)








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






build: $(ENGRAM_SVR_TGT) $(ENGRAM_TEST_TGT) $(ENGRAM_PUBLIC_TGT)





default: build




test: build
	$(MOCHA) $(MOCHA_FLAGS) node_modules/engram/test/es5


# -- Remove all ES5.

clean:
	@rm $(ENGRAM_SVR_TGT)
