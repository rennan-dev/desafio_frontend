# Desafio Frontend - MOB4AI

Este projeto foi desenvolvido por **Rennan de Souza Alves** como parte de um **desafio técnico de frontend** proposto pela empresa **MOB4AI**.

## 📄 Descrição

O desafio está detalhado no documento PDF localizado em: `documentation/Desafio Técnico Frontend.pdf`

O projeto consiste na criação de uma interface frontend que consome dados de uma API desenvolvida em Kotlin, com ambos os ambientes configurados em containers Docker.

## 🛠️ Tecnologias Utilizadas

### Fornecidas no desafio:
- **Kotlin** (Backend)
- **Docker**

### Adicionadas por mim:
- **React** (Frontend com Vite)
- **Framer Motion** (animações)
- **Tailwind CSS** (estilização)
- **ShadCN/UI** (componentes de interface)

## ▶️ Como Executar

### Pré-requisitos
- Ter o **Docker** instalado e em execução.

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/rennan-dev/desafio_frontend.git
   cd desafio_frontend
   ```

2. Execute o ambiente com Docker Compose:
    ```bash
    docker compose up --build
    ```

## 🌐 Acessos

- **Frontend:**  
  [http://localhost:5173/instant-current](http://localhost:5173/instant-current)

- **API Backend:**
  - [http://localhost:8080/temperature](http://localhost:8080/temperature)
  - [http://localhost:8080/battery](http://localhost:8080/battery)

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](./LICENSE).