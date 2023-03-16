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
                sourceFiles: 'dist/',
                remoteDirectory: 'nestjs-pnpm-backend',
                execCommand: 'cd /home/Chakhree/nestjs-pnpm-backend; docker rmi nestjs-pnpm-image; docker stop nestjs-pnpm-container; docker rm nestjs-pnpm-container; docker build --tag nestjs-pnpm-image .; docker run --detach --name nestjs-pnpm-container --publish 3000:3000 nestjs-pnpm-image;'
                )
            ]
            )
        ]
        )
      }
}

  }
}
