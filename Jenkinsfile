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
                        echo "$DOCKER_PASS" | docker login \
                            -u "$DOCKER_USER" \
                            --password-stdin

                        docker tag jen-ng \
                            "$DOCKER_USER/jen-node:latest"

                        docker push \
                            "$DOCKER_USER/jen-node:latest"
                    '''
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        passwordVariable: 'DOCKER_PASS',
                        usernameVariable: 'DOCKER_USER'
                    )
                ]) {
                    sh '''
                        echo "Kubernetes nodes:"
                        kubectl get nodes

                        echo "Applying Deployment..."
                        kubectl apply -f Deployment.yaml

                        echo "Applying Service..."
                        kubectl apply -f Service.yaml
                    '''
                }
            }
        }

        stage('Check Deployment') {
            steps {
                sh '''
                    echo "Deployments:"
                    kubectl get deployments

                    echo "Pods:"
                    kubectl get pods

                    echo "Services:"
                    kubectl get services
                '''
            }
        }
    }
}

