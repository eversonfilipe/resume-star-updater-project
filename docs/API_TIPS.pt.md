# Guia da Chave de API

Esta aplicação utiliza a API do Google Gemini para fornecer suas funcionalidades de inteligência artificial. Para usar a ferramenta, você deve fornecer sua própria chave de API.

## Como Obter Sua Chave de API

1.  **Visite o Google AI Studio**: Acesse o site do [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  **Faça Login**: Entre com sua conta do Google.
3.  **Crie a Chave de API**: Clique no botão "Create API key". Você pode ser solicitado a criar um novo projeto na Google Cloud se ainda não tiver um.
4.  **Copie Sua Chave**: Uma nova chave de API será gerada. Copie esta chave para a sua área de transferência.

## Como Usar Sua Chave na Aplicação

1.  **Encontre o Campo de Entrada**: Na página principal da aplicação, há uma seção designada para a sua chave de API.
2.  **Cole Sua Chave**: Cole a chave que você copiou do Google AI Studio no campo de entrada.
3.  **Salve a Chave**: Clique no botão "Salvar Chave". A chave será salva de forma segura no armazenamento local do seu navegador para a sessão atual. A aplicação está agora pronta para ser usada.

## Solução de Problemas

- **Erro "API Key not valid" (Chave de API inválida)**: Este erro significa que a chave que você forneceu está incorreta ou foi revogada.
  - Verifique se você copiou a chave inteira corretamente.
  - Certifique-se de que o projeto associado na Google Cloud tenha o faturamento ativado, pois o uso da API pode exigi-lo.
  - Verifique se a "Generative Language API" está ativada no seu projeto Google Cloud.

- **Custos de Uso**: Esteja ciente de que o uso da API do Google Gemini está sujeito aos preços do Google. Você é responsável por quaisquer custos incorridos pelo uso da sua chave de API.
