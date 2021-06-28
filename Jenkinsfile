pipeline {
    environment {
        REGISTRY = 'myg2020/myg'
        REGISTRY_CREDENTIAL = 'docker-hub-credential'
        GITHUB = 'git@github.com:/mraaz/myG'
        GITHUB_CREDENTIAL = 'git-private-key'
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
    agent {
        kubernetes {
            defaultContainer 'jnlp'
            yamlFile 'build.yaml'
        }
    }
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
                    s3Upload(file:'public', bucket:'myg-stage-frontend', path:'')
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
                    sh "npm run production"
                    sh "tar -zcvf frontend.tar.gz ./public/"
                    sh "mv frontend.tar.gz ./public/"
                }
                withAWS(credentials: "myg-aws-credentials") {
                    s3Upload( acl: 'PublicRead', file:'public', bucket:'mygame-prod-frontend', path:'')
                    cfInvalidate(distribution:"${DISTRIBUTION}", paths:['/*'])
                }
              }
        }
    }
}
