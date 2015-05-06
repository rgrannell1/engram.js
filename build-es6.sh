#!/usr/bin/env sh

for file in node_modules/engram/es6/*.es6
do

	filename="$(
		echo $file |
		sed "s/\.es6/\.js/" |
		sed "s/es6//g"

	)"

	echo $file "->" $filename

	babel $file --out-file $filename

done





for file in bin/*.es6
do

	filename="$(
		echo $file |
		sed "s/\.es6/\.js/" |
		sed "s/es6//g"

	)"

	echo $file "->" $filename

	babel $file --out-file $filename

done





echo "done."
