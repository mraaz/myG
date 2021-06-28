pipeline {
    environment {
        REGISTRY = 'myg2020/myg'
        REGISTRY_CREDENTIAL = 'docker-hub-credential'
        GITHUB = 'git@github.com:/mraaz/myG'
        GITHUB_CREDENTIAL = 'git-private-key'
        DOMAIN = 'localhost'
        DB_USER = credentials('db_user')
        DB_PASS = credentials('db_pass')
        DB_PASS_STAGE = credentials('db_pass_stage')
        APP_KEY = credentials('appkey')
        AWS_KEY = credentials('aws_key')
        AWS_SECRET = credentials('aws_secret')
        GOOGLE_ID = credentials('google_id')
        GOOGLE_SECRET = credentials('google_secret')
        FACEBOOK_SECRET = credentials('facebook_secret')
        MIX_GOOGLE_MAPS_KEY = credentials('mix_google_maps_key')
        SECRET_KEY = credentials('secret_key')
        SITE_KEY = credentials('site_key')
        TAG = sh(script: "echo `date +'%d.%m.%Y..%H.%M.%S'`", returnStdout: true).trim()
        DISTRIBUTION = credentials('cloud_front_distribution_id_myG')
    }
    tools {
        nodejs "default"
    }
    // agent {
    //     // kubernetes {
    //     //     defaultContainer 'jnlp'
    //     //     yamlFile 'build.yaml'
    //     // }
    //     // docker { 
    //     //   image 'node:8'
    //     //   args '-u root:root'
    //     // }
    // }
    stages {
        stage('Setup environment variables') {
          steps {
           sh(script: 'env')
          }
        }
        stage('Code Checkout') {
            when {
                expression {
                   return env.GIT_BRANCH == "origin/master"
                }
            }
            steps {
                git branch: 'master',
                credentialsId: 'git-private-key',
                url: 'https://github.com/mraaz/myG'
            }
        }
        stage('Docker Build') {
            when {
                expression {
                   return env.GIT_BRANCH == "origin/master"
                }
            }
            steps {
                container('docker') {
                    sh "docker build -t ${REGISTRY}:$TAG ."
                    sh "docker tag myg2020/myg:$TAG myg2020/myg:latest"
                }
            }
        }
        stage('Publish Frontend Stage') {
          when {
                expression {
                   return env.GIT_BRANCH == "origin/stage"
                }
            }
            steps {
                withNPM(npmrcConfig: 'ee91dee8-05da-4b62-88ba-174a08a3fba4') {
                    sh "npm install"
                    sh "npm run build"
                    sh "npm run production"
                    sh "tar -zcvf frontend.tar.gz ./public/"
                    sh "mv frontend.tar.gz ./public/"
                }
                withAWS(credentials: "myg-aws-credentials") {
                    s3Upload(file:'public', bucket:'myg-stage-frontend', path:'stage.myg.gg')
                    cfInvalidate(distribution:"${DISTRIBUTION}", paths:['/*'])
                }
              }
        }
        stage('Publish Frontend Prod') {
          when {
                expression {
                   return env.GIT_BRANCH == "origin/master"
                }
            }
            steps {
                withNPM(npmrcConfig: 'ee91dee8-05da-4b62-88ba-174a08a3fba4') {
                    sh "npm install"
                    sh "npm run build"
                    //sh "npm run production"
                    //sh "tar -zcvf frontend.tar.gz ./public/"
                    //sh "mv frontend.tar.gz ./public/"
                }
                withAWS(credentials: "myg-aws-credentials") {
                    //s3Upload(file:'public', bucket:'mygame-prod-frontend', path:'myg.gg')
                    //cfInvalidate(distribution:"${DISTRIBUTION}", paths:['/*'])
                }
              }
        }
        stage('Docker Publish') {
            when {
                expression {
                   return env.GIT_BRANCH == "origin/master"
                }
            }
            steps {
                container('docker') {
                    withDockerRegistry([credentialsId: "${REGISTRY_CREDENTIAL}", url: ""]) {
                        sh "docker push ${REGISTRY}:$TAG"
                        sh "docker push ${REGISTRY}:latest"
                    }
                }
              
             
            }
        }
        stage('Deploy image to stage') {
            when {
                expression {
                   return env.GIT_BRANCH == "origin/stage"
                }
            }
            steps {
                container('helm') {
                     withCredentials([file(credentialsId: 'kubernetes-stage-credential', variable: 'config')]) {
                       sh """
                       export KUBECONFIG=\${config}
                       helm upgrade myg ./helm/mygame -f ./helm/mygame-stage.yaml -n mygame --set image.tag=latest --set mygame.dataseUser=$DB_USER --set mygame.databasePassword=$DB_PASS_STAGE --set mygame.appKey=$APP_KEY --set mygame.googleID=$GOOGLE_ID --set mygame.googleSecret=$GOOGLE_SECRET --set mygame.facebookSecret=$FACEBOOK_SECRET --set mygame.mixGoogleMapsKey=$MIX_GOOGLE_MAPS_KEY --set mygame.secretKey=$SECRET_KEY --set mygame.siteKey=$SITE_KEY
                       """
                     }
                }
               }
        }
      stage('Deploy image to prod') {
            when {
                expression {
                   return env.GIT_BRANCH == "origin/master"
                }
            }
            steps {
                container('helm') {
                     withCredentials([file(credentialsId: 'kubernetes-credential', variable: 'config')]) {
                       sh """
                       export KUBECONFIG=\${config}
                       helm upgrade myg ./helm/mygame -f ./helm/mygame.yaml -n mygame --set image.tag=latest --set mygame.dataseUser=$DB_USER --set mygame.databasePassword=$DB_PASS --set mygame.appKey=$APP_KEY --set mygame.awsKey=$AWS_KEY --set mygame.awsSecret=$AWS_SECRET --set mygame.googleID=$GOOGLE_ID --set mygame.googleSecret=$GOOGLE_SECRET --set mygame.facebookSecret=$FACEBOOK_SECRET --set mygame.mixGoogleMapsKey=$MIX_GOOGLE_MAPS_KEY --set mygame.secretKey=$SECRET_KEY --set mygame.siteKey=$SITE_KEY
                       """
                     }
                }
               }
        }
    }
}
