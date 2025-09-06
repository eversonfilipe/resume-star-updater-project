# Dicas de Segurança

A segurança e a privacidade dos seus dados são uma prioridade máxima. Como esta é uma aplicação que roda do lado do cliente (*client-side*), aqui estão algumas dicas importantes a serem consideradas.

## Para Usuários

### Segurança da Chave de API

- **Sua Chave é Armazenada Localmente**: A chave de API do Google Gemini que você fornece é armazenada **apenas no armazenamento local (local storage) do seu navegador**. Ela nunca é enviada ou armazenada em qualquer servidor que não seja os próprios endpoints da API do Google durante as requisições.
- **Use em Dispositivos Confiáveis**: Evite usar esta aplicação e inserir sua chave de API em computadores públicos ou compartilhados. Se for necessário, sempre se certifique de sair da sua conta Google e limpar o armazenamento local do navegador quando terminar.
- **Não Compartilhe Sua Chave**: Trate sua chave de API como uma senha. Não a compartilhe publicamente nem a envie para repositórios de código públicos.
- **Monitore o Uso**: Fique de olho no painel de faturamento da sua Google Cloud Platform para monitorar o uso da sua chave de API.

### Dados do Currículo

- **Processamento no Cliente**: Todo o processamento do currículo acontece diretamente no seu navegador. Os dados do seu currículo não são salvos ou registrados em nenhum lugar. Assim que você fecha a aba do navegador, os dados são perdidos.

## Para Desenvolvedores

- **Sem Armazenamento no Servidor**: A aplicação foi projetada para ser totalmente do lado do cliente. Não introduza componentes do lado do servidor que possam armazenar dados do usuário ou chaves de API.
- **Variáveis de Ambiente para Desenvolvimento**: Ao desenvolver localmente, use um arquivo `.env` para armazenar sua chave de API e certifique-se de que `.env` esteja listado no seu arquivo `.gitignore` para evitar commits acidentais.
- **Auditoria de Dependências**: Audite regularmente as dependências em busca de vulnerabilidades de segurança conhecidas.
