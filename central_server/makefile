init: init
	docker build . -t app
dev: dev
	docker run -it -p 1993:80 -v $(PWD):/usr/src/eszett app
dev_toku: dev_toku
	docker run -it -p 1993:80 -v $(PWD):/usr/src/eszett app