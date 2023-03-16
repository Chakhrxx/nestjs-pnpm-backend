pipeline {
  agent any

  tools {nodejs 'nodejs-16.15.0'}

  stages {
    // stage('Checkout') {
    //   steps {
    //     checkout([$class: 'GitSCM', branches: [[name: '*/main']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/Chakhrxx/nestjs-yarn.git']]])
    //   }
    // }
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
                sourceFiles: '*',
                remoteDirectory: 'nestjs-pnpm-backend2',
                execCommand: 'cd /home/Chakhree/nestjs-pnpm-backend2;'
                )
            ]
            )
        ]
        )
      }
}

  }
}
