# DentComm - Website Institucional

Este é o repositório do site institucional da DentComm, construído com HTML, Tailwind CSS e JavaScript puro. O projeto é modular e otimizado para fácil manutenção e deploy.

## Estrutura do Projeto

- **/public**: Contém os assets finais compilados, como o CSS principal (`main.css`) e imagens.
- **/src**: Contém os arquivos fonte do projeto.
  - **/css**: Arquivo `styles.css` com os estilos customizados e as diretivas do Tailwind.
  - **/js**: Scripts modulares para interatividade (`app.js`), tradução (`lang.js`) e animações (`scroll.js`).
  - **/pages**: Fragmentos HTML de cada página do site.
- **index.html**: A página "shell" que carrega dinamicamente o conteúdo das páginas.
- **tailwind.config.js**: Arquivo de configuração do Tailwind CSS.
- **package.json**: Dependências e scripts do Node.js.

## Pré-requisitos

Para rodar este projeto localmente, você precisará ter o [Node.js](https://nodejs.org/) (que inclui o npm) instalado em sua máquina.

## Instalação

1.  Clone este repositório para sua máquina local.
2.  Navegue até o diretório raiz do projeto (`dentcomm-site`).
3.  Execute o seguinte comando para instalar as dependências de desenvolvimento (Tailwind, PostCSS, Autoprefixer):

    ```bash
    npm install
    ```

## Como Rodar Localmente

Para compilar o CSS e observar as mudanças em tempo real, use o script `watch:css`.

```bash
npm run watch:css