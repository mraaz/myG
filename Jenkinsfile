pipeline {
    environment {
        DEPLOY = "${env.BRANCH_NAME == "avin" ? "true" : "false"}"
        DOMAIN = 'localhost'
        TAG = "${date +'%d.%m.%Y..%H.%M.%S'}"
        REGISTRY = 'myg2020/myg'
        REGISTRY_CREDENTIAL = 'docker-hub-credential'
        GITHUB = 'git@github.com:/mraaz/myG'
        GITHUB_REDENTIAL = 'git-private-key'
    }
    agent {
        kubernetes {
            defaultContainer 'jnlp'
            yamlFile 'build.yaml'
        }
    }

    stage('Code Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/avin']],
                    userRemoteConfigs: [[credentialsId: '${GITHUB_REDENTIAL}', url: '${GITHHUB}']]
                ])
            }
        }


    stages {
        stage('Docker Build') {
            steps {
                container('docker') {
                    sh "docker build -t ${REGISTRY}:$TAG ."
                    sh "docker tag myg2020/myg:$TAG myg2020/myg:latest"
                }
            }
        }
        stage('Docker Publish') {
            steps {
                container('docker') {
                    withDockerRegistry([credentialsId: "${REGISTRY_CREDENTIAL}", url: ""]) {
                        sh "docker push ${REGISTRY}"
                    }
                }
            }
        }
        stage('Deploy image') {
            steps {
                container('helm') {
                    sh "helm upgrade --install --force ./helm/mygame -f ./helm/mygame.yaml -n mygame"
                }
            }
        }
    }
}
