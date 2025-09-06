# Guia do Desenvolvedor

Bem-vindo(a), contribuidor(a)! Este guia fornece todas as informações de que você precisa para começar a desenvolver e contribuir para o projeto **CV Optimizado - STAR + ATS**.

## 1. Começando

### Pré-requisitos

- Um navegador web moderno (Chrome, Firefox, Safari, Edge).
- Um editor de texto ou IDE (ex: VS Code).
- Um servidor web local simples. O projeto está configurado para rodar sem um passo de compilação complexo.

### Rodando o Projeto Localmente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/eversonfilipe/resume-star-updater-project.git
    cd resume-star-updater-project
    ```

2.  **Configure sua Chave de API:**
    A aplicação requer uma chave de API do Google Gemini para funcionar. Para desenvolvimento local, é recomendado manusear isso de forma segura. Embora a UI da aplicação permita que você insira uma chave, você pode querer uma solução mais permanente durante o desenvolvimento.
    - Obtenha sua chave no [Google AI Studio](https://aistudio.google.com/app/apikey).
    - Você pode inseri-la diretamente na interface da aplicação assim que ela estiver rodando.

3.  **Inicie o servidor de desenvolvimento:**
    Como este projeto usa Módulos ES e `importmap`, você não precisa de `npm install` ou de um empacotador como Webpack/Vite. Você só precisa de um servidor local simples para servir o arquivo `index.html`.

    Uma maneira comum e fácil é usar o servidor embutido do Python:
    ```bash
    # Se você tiver Python 3
    python -m http.server

    # Se você tiver Python 2
    python -m SimpleHTTPServer
    ```
    Alternativamente, você pode usar a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para o VS Code.

4.  **Abra no Navegador**: Navegue para `http://localhost:8000` (ou a porta em que seu servidor estiver rodando) no seu navegador.

## 2. Visão Geral do Código

### Estrutura de Pastas

- `components/`: Contém todos os componentes React reutilizáveis. Cada componente deve ser autocontido em seu próprio arquivo (ex: `Header.tsx`).
- `services/`: Abriga a lógica para interagir com APIs externas. `geminiService.ts` é a interface para a API do Google Gemini.
- `docs/`: Toda a documentação relacionada ao projeto reside aqui.
- `App.tsx`: O componente principal da aplicação que gerencia o estado e renderiza os diferentes passos da UI.
- `index.tsx`: O arquivo raiz que monta a aplicação React no DOM.

### Tecnologias e Convenções Chave

- **React**: Usamos componentes funcionais e hooks (`useState`, `useEffect`, `useCallback`). Mantenha os componentes pequenos e focados em uma única responsabilidade.
- **TypeScript**: Todo novo código deve ser escrito em TypeScript. Use interfaces ou tipos para definir props e estado para segurança de tipos.
- **Tailwind CSS**: Use classes utilitárias diretamente no seu JSX para estilização. Evite escrever arquivos CSS personalizados, a menos que seja absolutamente necessário. Siga o sistema de design definido no `tailwind.config` dentro do `index.html`.
- **Nomenclatura de Componentes**: Use PascalCase para nomes de arquivos de componentes e funções de componentes (ex: `PrimaryButton.tsx`).
- **Commits**: Siga a convenção de mensagens de commit (ex: `feat: Adiciona novo componente de botão`, `fix: Corrige tratamento de erro da API`).

## 3. Como Contribuir

Por favor, veja nossas [Diretrizes de Contribuição](./CONTRIBUTING.pt.md) para instruções detalhadas sobre como submeter relatórios de bugs, solicitações de funcionalidades e pull requests.

### Tarefas Comuns de Desenvolvimento

#### Adicionando um Novo Componente

1.  Crie um novo arquivo no diretório `components/` (ex: `NewComponent.tsx`).
2.  Escreva a lógica do componente usando React e TypeScript.
3.  Estilize-o usando as classes utilitárias do Tailwind CSS.
4.  Importe e use-o em um componente pai, como `App.tsx` ou outro componente.

#### Modificando uma Chamada de API

1.  Abra `services/geminiService.ts`.
2.  Localize a função que você precisa alterar (`extractExperiencesFromResume` ou `generateFinalResume`).
3.  Modifique o prompt, os parâmetros do modelo ou o tratamento da resposta conforme necessário.
4.  Certifique-se de tratar possíveis erros de forma adequada.
