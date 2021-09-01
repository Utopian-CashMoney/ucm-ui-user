pipeline {
    agent any

    tools {
        nodejs 'nodejs'
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
                // Install NodeJS dependencies
                sh 'npm install --force'
                // Build NodeJS project
                sh 'npm run build'
            }
        }
        
        stage('Push to S3 Bucket') {
            steps {
                withAWS(credentials: 'jenkins-credentials', region: 'us-east-1') {
                    // Install community.aws ansible packages
                    sh 'ansible-galaxy collection install community.aws'
                    // Push to S3 Bucket
                    sh 'ansible-playbook playbooks/UploadPlaybook.yaml -e ENV=' + env.BRANCH_NAME
                }
            }
        }
    }
}
