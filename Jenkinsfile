pipeline {
  agent any

  tools {nodejs 'nodejs-16.15.0'}

  stages {

    stage('Install') {
      steps {
        sh 'npm install -g pnpm'
        sh 'pnpm install'
      }
    }

    stage('Build') {
      steps {
        sh 'pnpm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'pnpm run test'
      }
    }
    
    stage('Deploy') {
      steps {
        sshPublisher(
        continueOnError: false, 
        failOnError: true,
        publishers: [
            sshPublisherDesc(
            configName: 'Ansible',
            verbose : true,
            transfers: [
                sshTransfer(
                sourceFiles: 'src/, Dockerfile, nest-cli.json, package.json, pnpm-lock.yaml, tsconfig.build.json, tsconfig.json, Ansiblefile.yaml',
                remoteDirectory: 'docker/nestjs-pnpm-backend',
                execCommand : 'ansible-playbook -v -i /etc/ansible/hosts /home/Chakhree/docker/nestjs-pnpm-backend/Ansiblefile.yaml'
                )
            ]
            )
        ]
        )
      }
}

  }
}
