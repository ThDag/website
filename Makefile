

all: deploy_full

deploy_full:
	ssh -i ~/.ssh/id_rsa tahadg@192.168.1.199 "cd ~/Docker/website && git pull && docker compose up --build -d && ~/scripts/purge.sh "

deploy_server:
	ssh -i ~/.ssh/id_rsa tahadg@192.168.1.199 "cd ~/Docker/website && git pull && docker compose up server --build -d && ~/scripts/purge.sh "

deploy_client:
	ssh -i ~/.ssh/id_rsa tahadg@192.168.1.199 "cd ~/Docker/website && git pull && docker compose up nginx --build -d && ~/scripts/purge.sh "

