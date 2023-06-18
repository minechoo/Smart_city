
# chocolatey 설치 (powershell 관리자 모드)
```
Set-ExecutionPolicy Bypass -Scope Process -Force; iwr https://community.chocolatey.org/install.ps1 -UseBasicParsing | iex
```


# powershell 실행 권한 변경

```

PS > Set-ExecutionPolicy RemoteSigned
PS > Get-ExecutionPolicy

```
# install node
```
choco install nodejs
node -v
```

# install yarn

```
npm i -g yarn 
yarn -v

```

## Ignore yarn engine check
```
yarn config set ignore-engines true
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# software structure

![](doc\software_arch.png)