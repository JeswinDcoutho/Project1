pipeline {
    agent any

    stages {

        stage('Git') {
            steps {
                git url: 'https://github.com/JeswinDcoutho/Project1.git',
                    branch: 'master'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t jen-ng .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        passwordVariable: 'DOCKER_PASS',
                        usernameVariable: 'DOCKER_USER'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                        docker tag jen-ng "$DOCKER_USER/jen-ng:$BUILD_NUMBER"

                        docker push "$DOCKER_USER/jen-ng:$BUILD_NUMBER"
                    '''
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                sh '''
                    kubectl apply -f Deployment.yaml
                    kubectl apply -f Service.yaml
                '''
            }
        }

        stage('Check Deployment') {
            steps {
                sh '''
                    kubectl get pods
                    kubectl get services
                '''
            }
        }
    }
}
