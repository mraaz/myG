pipeline {
    environment {
        REGISTRY = 'myg2020/myg'
        REGISTRY_CREDENTIAL = 'docker-hub-credential'
        GITHUB = 'git@github.com:/mraaz/myG'
        GITHUB_CREDENTIAL = 'git-private-key'
        DB_USER = 'db_user'
        DB_PASS = 'db_pass'
        APP_KEY = 'appkey'
        AWS_KEY = 'aws_key'
        AWS_SECRET = 'aws_secret'
        GOOGLE_ID = 'google_id'
        GOOGLE_SECRET = 'google_secret'
        TAG = sh(script: "echo `date +'%d.%m.%Y..%H.%M.%S'`", returnStdout: true).trim()
    }
    agent {
        kubernetes {
            defaultContainer 'jnlp'
            yamlFile 'build.yaml'
        }
    }

    stages {
        stage('Code Checkout') {
            steps {
                  git branch: 'master',
                      credentialsId: 'git-private-key',
                      url: 'https://github.com/mraaz/myG'
            }
        }

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
                        sh "docker push ${REGISTRY}:$TAG"
                        sh "docker push ${REGISTRY}:latest"
                    }
                }
            }
        }
        stage('Deploy image') {
            steps {
                container('helm') {
                     withCredentials([file(credentialsId: 'kubernetes-credential', variable: 'config')]) {
                       sh """
                       export KUBECONFIG=\${config}
                       helm upgrade myg ./helm/mygame -f ./helm/mygame.yaml -n mygame --set image.tag=$TAG --set mygame.dataseUser=$DB_USER --set mygame.databasePassword=$DB_PASS --set mygame.appKey=$APP_KEY --set mygame.awsKey=$AWS_KEY --set mygame.awsSecret=$AWS_SECRET --set mygame.googleID=$GOOGLE_ID --set mygame.googleSecret=$GOOGLE_SECRET
                       """
                     }
                }
            }
        }
    }
}
