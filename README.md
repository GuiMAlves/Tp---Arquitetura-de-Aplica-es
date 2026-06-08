# Sistema de Gerenciamento de Estoque para Concessionária

## 📋 Sumário

1. [Objetivo](#objetivo)
2. [Descrição do Projeto](#descrição-do-projeto)
3. [Arquitetura e Componentes](#arquitetura-e-componentes)
4. [Tecnologias Utilizadas](#tecnologias-utilizadas)
5. [Pré-requisitos](#pré-requisitos)
6. [Instalação e Configuração](#instalação-e-configuração)
7. [Como Executar](#como-executar)
8. [Funcionalidades](#funcionalidades)
9. [Estrutura do Projeto](#estrutura-do-projeto)

## Objetivo

Este projeto foi desenvolvido como trabalho prático semestral da disciplina de Arquitetura de Aplicações Web. Tem como objetivo implementar um sistema completo de gerenciamento de estoque para uma concessionária de veículos, aplicando conceitos de arquitetura de software, incluindo separação de camadas (frontend, backend e banco de dados).

## Descrição do Projeto

O sistema é uma aplicação web que permite o gerenciamento eficiente do estoque de veículos de uma concessionária. Possibilita aos usuários autenticados visualizar, criar, editar e excluir informações sobre marcas de veículos e seus respectivos modelos, mantendo um controle organizado do inventário.

## Arquitetura e Componentes

O projeto segue uma arquitetura em três camadas:

- **Frontend**: Interface web responsável pela experiência do usuário
- **Backend**: API REST que processa as requisições e gerencia a lógica de negócio
- **Banco de Dados**: Persistência de dados utilizando contêineres Docker

## Tecnologias Utilizadas

- **Backend**: Node.js com Express.js
- **Frontend**: HTML, CSS e JavaScript (vanilla)
- **Banco de Dados**: Mongodb (via Docker)
- **Containerização**: Docker e Docker Compose
- **Versionamento**: Git com arquivo `.gitignore` configurado

## Pré-requisitos

Antes de executar o projeto, certifique-se de que possui as seguintes ferramentas instaladas:

- **Node.js** (versão LTS ou superior) - para executar a aplicação backend
- **npm** (gerenciador de pacotes, incluído com Node.js)
- **WSL 2** (recomendado para usuários Windows) - ambiente Linux integrado ao Windows
- **Docker Dekstop** (recomendado para usuários Windows) - ele possibilita usar o container no linux
- **Git** (opcional) - para controle de versão

## Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone <URL-do-repositorio>
cd Tp\ -\ Arquitetura\ de\ Aplicações
```

### 2. Iniciar o Banco de Dados

Certifique-se de que o Docker Desktop está em execução:

```bash
docker-compose up -d
```

Este comando irá:
- Criar e iniciar o contêiner do banco de dados Mongodb
- Configurar as variáveis de ambiente necessárias
- Manter o serviço rodando em background

### 3. Instalar Dependências do Backend

```bash
cd backend
npm install
```

## Como Executar

### Iniciar o Servidor Backend

1. Navegue até a pasta backend (se ainda não estiver nela):

```bash
cd backend
```

2. Execute a aplicação:

```bash
npm run start
```

3. Acesse a aplicação no navegador:

```
http://localhost:3000
```

### Estrutura de Execução Recomendada

1. Abra um terminal e execute o Docker Compose (mantenha rodando)
2. Abra outro terminal e execute o backend (mantenha rodando)
3. Acesse a aplicação via navegador

## Funcionalidades

### Autenticação de Usuários
- Tela de login com validação de credenciais
- Registro de novos usuários
- Gerenciamento seguro de sessões

### Gestão de Marcas
- Visualizar lista de todas as marcas cadastradas
- Adicionar novas marcas de veículos
- Editar informações de marcas existentes
- Deletar marcas do sistema

### Gestão de Modelos
- Visualizar tabela detalhada de modelos de veículos
- Adicionar novos modelos com informações específicas
- Editar dados dos modelos existentes
- Excluir modelos do estoque

### Dashboard Principal
- Tela de boas-vindas pós-autenticação
- Informações da empresa
- Navegação intuitiva entre as principais funcionalidades

## Estrutura do Projeto

```
.
├── docker-compose.yml          # Configuração dos serviços Docker
├── README.md                   # Documentação do projeto
├── TrabalhoPraticoSemestral.md # Especificações do trabalho
├── backend/
│   ├── package.json            # Dependências do Node.js
│   ├── src/
│   │   ├── app.js             # Configuração da aplicação Express
│   │   ├── server.js          # Inicialização do servidor
│   │   ├── config/            # Arquivos de configuração
│   │   │   ├── db.js          # Conexão com banco de dados
│   │   │   └── swagger.js     # Documentação da API
│   │   ├── controllers/       # Controladores de requisições
│   │   ├── middleware/        # Middlewares (autenticação, etc.)
│   │   ├── models/            # Modelos de dados
│   │   ├── routes/            # Definição de rotas
│   │   └── services/          # Serviços de negócio
│   └── .gitignore             # Arquivos ignorados pelo Git
└── frontend/
    ├── index.html             # Página principal
    ├── app.js                 # Lógica da aplicação frontend
    └── styles.css             # Estilos da aplicação
```



