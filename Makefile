URL := $$(cat env.json | grep URL | sed 's/"/ /g' | awk {'print $$3'})
token := $$(cat env.json | grep token | sed 's/"/ /g' | awk {'print $$3'})

init i:
	@echo "[Dependencies] Installing dependencies"
	@npm install

deploy d:
	@echo "[Firebase Hosting Deployment] Deploying Webpage"
	@firebase deploy --only hosting:production

deploy-test dt:
	@echo "[TESTING] [Firebase Hosting Deployment] Deploying Webpage"
	@firebase deploy --only hosting:testing

run r:
	@echo "[Running] Running web app"
	@URL=$(URL) token=$(token) envsubst < config_template.js > ./src/functions/config.js
	@npm start