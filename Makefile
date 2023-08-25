export
AWS_DEFAULT_PROFILE=fief
API=${env}-web-app
ECS_CLUSTER=${env}-frontend
SERVICE_TAG=${tag}
AWS_REGION=us-west-2
ECR=098990664116.dkr.ecr.us-west-2.amazonaws.com
ECS_API_REPO=${ECR}/${API}
dev_DISTRIBUTION=E1JEFGIA445KUM
prod_DISTRIBUTION=EQL75TZLQ7FDT
all: build push deploy

test-envvars:
	@[ "${env}" ] || ( echo "env var is not set"; exit 1 )
	@[ "${tag}" ] || ( echo "tag var is not set"; exit 1 )

build: test-envvars
	docker build --platform linux/amd64 -t $(ECS_API_REPO):${SERVICE_TAG} .

push: test-envvars
	aws ecr get-login-password --region $(AWS_REGION) | docker login --username AWS --password-stdin $(ECS_API_REPO)
	docker push $(ECS_API_REPO):${SERVICE_TAG}

deploy: test-envvars
	aws ecs --region $(AWS_REGION) update-service --cluster $(ECS_CLUSTER) --service ${API} --force-new-deployment \
	&& aws cloudfront create-invalidation --distribution-id $(${env}_DISTRIBUTION) --paths "/*"
