# Arquitetura da Aplicação

Este documento fornece uma visão geral de alto nível da arquitetura técnica da aplicação **CV Optimizado - STAR + ATS**.

## 1. Filosofia Principal

A aplicação foi projetada como uma **aplicação de página única (SPA) totalmente do lado do cliente (*client-side*)**. Essa escolha arquitetônica prioriza a privacidade e a segurança do usuário, pois nenhum dado do usuário (conteúdo do currículo ou chaves de API) é enviado ou armazenado em um servidor de terceiros controlado pelo proprietário da aplicação. Toda a lógica, gerenciamento de estado e chamadas à API do Google Gemini ocorrem diretamente no navegador do usuário.

## 2. Tecnologias Utilizadas

- **Framework Frontend**: **React (v19)** com **TypeScript** para construir uma interface de usuário baseada em componentes e com tipagem segura.
- **Integração com IA**: **API Google Gemini** através do SDK `@google/genai` para todo o processamento e geração de texto com inteligência artificial.
- **Estilização**: **Tailwind CSS** para um framework CSS *utility-first* que permite o desenvolvimento rápido e responsivo da interface.
- **Animações**: **Framer Motion** para criar animações e transições fluidas, melhorando a experiência do usuário.
- **Carregamento de Módulos**: O projeto usa Módulos ES modernos com um `importmap` para carregar dependências diretamente de uma CDN, simplificando a configuração de desenvolvimento sem a necessidade de um passo de compilação complexo.

## 3. Estrutura do Projeto

A base de código é organizada em uma estrutura modular para garantir uma clara separação de responsabilidades:

```
/
├── components/       # Componentes React reutilizáveis (ex: botões, inputs, formulários)
├── services/         # Módulos para interações com APIs externas (ex: geminiService.ts)
├── docs/             # Documentação do projeto (guias, arquitetura, etc.)
├── App.tsx           # Componente principal da aplicação, gerencia o estado e o fluxo da UI
├── index.tsx         # Ponto de entrada para a aplicação React
├── index.html        # A única página HTML para a SPA
└── metadata.json     # Metadados da aplicação
```

## 4. Gerenciamento de Estado

O gerenciamento de estado é feito localmente nos componentes React usando hooks.

- **Estado Global**: O componente raiz `App.tsx` atua como o principal contêiner de estado. Ele gerencia o estado geral da aplicação, incluindo o passo atual no fluxo de trabalho (`currentStep`), o texto do currículo, as experiências extraídas, o currículo otimizado final, os estados de carregamento e quaisquer erros. O estado é passado para os componentes filhos através de props.
- **Estado do Componente**: Componentes individuais gerenciam seu próprio estado específico da UI. Por exemplo, `ApiKeyInput.tsx` gerencia a visibilidade da chave de API, e `OptimizedResume.tsx` gerencia seu estado de "copiado".
- **Atualizações de Estado**: O hook `useCallback` é usado para as funções de manipulação de eventos para evitar re-renderizações desnecessárias, otimizando o desempenho.

## 5. Fluxo de Dados

A aplicação segue um fluxo de dados unidirecional, típico de aplicações React, organizado em três passos principais:

1.  **Passo 1: Inserção e Extração**
    - O usuário cola seu currículo no `<ResumeInput />` e fornece sua chave de API Gemini no `<ApiKeyInput />`.
    - O `App.tsx` aciona `extractExperiencesFromResume()` no `geminiService.ts`.
    - O serviço envia o texto do currículo para a API Gemini, solicitando a extração de cargos e empresas em um formato JSON estruturado.
    - As experiências extraídas são retornadas para o `App.tsx` e armazenadas no estado, avançando a UI para o Passo 2.

2.  **Passo 2: Detalhamento (Método STAR)**
    - O componente `<StarForm />` renderiza um formulário para cada experiência extraída.
    - O usuário preenche a Situação, Tarefa, Ação e Resultado para cada cargo. A entrada do usuário atualiza o estado `experiences` no `App.tsx`.
    - Assim que todos os campos estão completos, o usuário clica em "Gerar Currículo Final".

3.  **Passo 3: Resultado**
    - O `App.tsx` chama `generateFinalResume()` em `geminiService.ts`, passando o currículo original e as experiências STAR detalhadas pelo usuário.
    - O serviço constrói um prompt detalhado instruindo a API Gemini a reescrever a seção de experiência do currículo, preservando todas as outras seções.
    - O texto do currículo totalmente otimizado, gerado pela IA, é retornado para o `App.tsx`, armazenado no estado e exibido no componente `<OptimizedResume />`.

## 6. Segurança

- **Manuseio da Chave de API**: A chave de API do Google Gemini do usuário é armazenada exclusivamente no `localStorage` do navegador. Ela é lida do `localStorage` apenas para ser usada em chamadas de API feitas diretamente do cliente para os servidores do Google.
- **Privacidade dos Dados**: O conteúdo do currículo é mantido em memória (estado do React) e nunca é persistido fora da sessão do navegador do usuário, garantindo total privacidade.
