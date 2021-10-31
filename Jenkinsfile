pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))
        withAWS(credentials: 'jenkins-credentials')
    }

    stages {
        stage('SonarQube analysis') {
            steps {
                script {
                    scannerHome = tool 'SonarQube Scanner 4.6'
                }
                withSonarQubeEnv('SonarQube Scanner') {
                    sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=ucm-user-ui -Dsonar.sources=. -Dsonar.host.url=http://52.55.57.2:81 -Dsonar.login=6e2bdccbd03920367342abf44880e0010f5df2c2"
                }
            }
        }
        
        stage('Build NodeJS') {
            steps {
                sh 'npm cache clean --force'
                // Install NodeJS dependencies
                sh 'npm install'
                // Build NodeJS project
                sh 'npm run build'
            }
        }
        
        stage('Push to S3 Bucket') {
            steps {
                // Install community.aws ansible packages
                sh 'ansible-galaxy collection install community.aws'
                // Push to S3 Bucket
                sh 'ansible-playbook playbooks/UploadPlaybook.yaml -e ENV=' + env.BRANCH_NAME
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
