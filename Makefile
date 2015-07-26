
# -- Node binaries
BIN := ./node_modules/.bin





# -- Babel
BABEL        ?= $(BIN)/babel
BABEL_FLAGS  ?=





# -- JS Hint
JSHINT       ?= $(BIN)/jshint
JSHINT_FLAGS ?= --config ~/Code/jshint/global.json




# -- Engram server/source code
ENGRAM_SVR_SRC ?= $(wildcard node_modules/engram/es6/*.js)
ENGRAM_SVR_TGT ?= $(ENGRAM_SVR_SRC:node_modules/engram/es6/%.js=node_modules/engram/es5/%.js)




# -- Build server source code

node_modules/engram/es5: $(ENGRAM_SVR_TGT)
node_modules/engram/es5/%.js: node_modules/engram/es6/%.js

	mkdir -p $(@D)
	$(BABEL) $(BABEL_FLAGS) $< --out-file $@

clean:
	@rm $(ENGRAM_SVR_TGT)
