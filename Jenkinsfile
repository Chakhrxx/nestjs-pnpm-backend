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
        sh 'pnpm build'
      }
    }

    // stage('Test') {
    //   steps {
    //     sh 'pnpm test'
    //   }
    // }

    stage('SSH Tranfers') {
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
                sourceFiles: 'config/, middlewares/, models/, routes/, src/ , Ansiblefile.yaml, Dockerfile, nest-cli.json, package.json, pnpm-lock.yaml, tsconfig.build.json, tsconfig.json',
                remoteDirectory: 'docker/nestjs-pnpm-backend'
                )
            ]
            )
        ]
        )
      }
    }

    // stage('Deploy') {
    //   steps {
    //     sshPublisher(
    //     continueOnError: false, 
    //     failOnError: true,
    //     publishers: [
    //         sshPublisherDesc(
    //         configName: 'Ansible',
    //         verbose : true,
    //         transfers: [
    //             sshTransfer(
    //             sourceFiles: 'config/, middlewares/, models/, routes/, src/ , Ansiblefile.yaml, Dockerfile, nest-cli.json, package.json, pnpm-lock.yaml, tsconfig.build.json, tsconfig.json',
    //             remoteDirectory: 'docker/nestjs-pnpm-backend',
    //             execCommand : 'ansible-playbook -v -i /etc/ansible/hosts /home/Chakhree/docker/nestjs-pnpm-backend/Ansiblefile.yaml'
    //             )
    //         ]
    //         )
    //     ]
    //     )
    //   }
    // }

  }
}
