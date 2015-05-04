
docco $(find node_modules/engram -name '*.es6')
pandoc --read=markdown_github -o README.html README.md
