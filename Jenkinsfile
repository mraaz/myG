pipeline {
    environment {
        REGISTRY = 'myg2020/myg'
        REGISTRY_CREDENTIAL = 'docker-hub-credential'
        GITHUB = 'git@github.com:/mraaz/myG'
        GITHUB_CREDENTIAL = 'git-private-key'
        DB_USER = credentials('db_user')
        DB_PASS = credentials('db_pass')
        APP_KEY = credentials('appkey')
        AWS_KEY = credentials('aws_key')
        AWS_SECRET = credentials('aws_secret')
        GOOGLE_ID = credentials('google_id')
        GOOGLE_SECRET = credentials('google_secret')
        FACEBOOK_ID = credentials('facebook_id')
        FACEBOOK_SECRET = credentials('facebook_secret')
        MIX_GOOGLE_MAPS_KEY = credentials('mix_google_maps_key')
        SECRET_KEY = credentials('secret_key')
        SITE_KEY = credentials('site_key')
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
                       helm upgrade myg ./helm/mygame -f ./helm/mygame.yaml -n mygame --set image.tag=$TAG --set mygame.dataseUser=$DB_USER --set mygame.databasePassword=$DB_PASS --set mygame.appKey=$APP_KEY --set mygame.awsKey=$AWS_KEY --set mygame.awsSecret=$AWS_SECRET --set mygame.googleID=$GOOGLE_ID --set mygame.googleSecret=$GOOGLE_SECRET --set mygame.facebookID=\"$FACEBOOK_ID\" --set mygame.facebookSecret=$FACEBOOK_SECRET --set mygame.mixGoogleMapsKey=$MIX_GOOGLE_MAPS_KEY --set mygame.secretKey=$SECRET_KEY --set mygame.siteKey=$SITE_KEY
                       """
                     }
                }
            }
        }
    }
}
