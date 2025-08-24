# Sistema de Rotinas Administrativas

Este é um sistema web desenvolvido em **React + Vite + TailwindCSS**, com backend em **Node.js + SQLite**, para gerenciar rotinas e atividades de usuários em um escritório contábil.

O sistema permite:

- Cadastro de usuários.  
- Login de usuários existentes.  
- Criação, listagem, atualização e exclusão de atividades, associadas a cada usuário.  
- Cada usuário visualiza apenas suas próprias atividades.  

---

## Tecnologias utilizadas

- **Frontend:** React, Vite, TailwindCSS  
- **Backend:** Node.js, Express  
- **Banco de dados:** SQLite  

---

## Pré-requisitos

- Node.js >= 18  
- npm >= 9  

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Preedroos/sistema-contabil.git
cd sistema-contabil
```

2. Instale as dependências do frontend:
```bash
npm install
```

## Executando o projeto

1. Rodar o backend:

```bash
node server
```

O backend estará disponível em: http://localhost:3001

Certifique-se de que o arquivo database.db esteja criado pelo backend (ele será gerado automaticamente na primeira execução).

2. Rodar o frontend:

```bash
npm run dev
```

O frontend estará disponível em: http://localhost:5173

## Uso do sistema

1. Abra o navegador e acesse http://localhost:5173.

2. Na tela de login:

    * Para usuários existentes, digite o email e clique em Entrar.

    * Para novos usuários, clique em Criar uma conta, preencha nome e email e clique em Cadastrar.

3. Após o login, você será direcionado ao Dashboard, onde poderá:

    * Visualizar suas atividades.

    * Adicionar novas atividades.

    * Alterar o status de uma atividade (Pendente / Concluída).

    * Excluir atividades.

Cada usuário só verá suas próprias atividades no sistema.