# Academia Embalar

Landing page estática em HTML, CSS e JavaScript, sem build. A finalização da inscrição acontece exclusivamente no WhatsApp. O valor de participação continua R$ 50,00, informado no site; as orientações são dadas pela equipe.

## Usar e visualizar

Abra `index.html` no navegador ou sirva esta pasta em um servidor estático local. Não é necessário PHP, banco de dados, conta de pagamentos ou credencial.
Para uma prévia local com Python instalado: `python -m http.server 8000 --bind 127.0.0.1`, executado nesta pasta. Abra `http://127.0.0.1:8000`.

## Atendimento

O botão abre uma conversa para `558287279439`, exatamente o número fornecido: +55 82 8727-9439. A mensagem pré-preenchida é genérica, sem dados pessoais. O visitante decide se quer enviá-la. Nenhuma mensagem é enviada automaticamente.
O número é configurado em `js/site-config.js`; atualize também o texto visível no HTML se ele mudar. Um número ausente ou com formato inválido mantém o botão oculto. O telefone permanece visível como alternativa se o JavaScript não funcionar.
Abrir o WhatsApp não registra nem confirma inscrição. A equipe orienta e conclui o atendimento. Não solicitar dados de cartão pela conversa.

## Segurança e privacidade

- Não há formulário, endpoints PHP, cadastro em banco, pagamento online, credenciais, cookies ou armazenamento de dados pelo JavaScript desta versão.
- Links de atendimento usam domínio fixo `wa.me`, número validado, mensagem codificada e `noopener noreferrer`.
- Dependências e mídias são locais. Links de redes sociais e e-mail ainda não informados são textos inativos.
- `.htaccess` desabilita listagem de pastas, restringe arquivos internos e configura cabeçalhos de segurança para Apache 2.4. Requer AllowOverride e mod_headers; servidores estáticos, Nginx/IIS e a prévia local não aplicam essas regras automaticamente.
- Em produção, use HTTPS, configure os cabeçalhos equivalentes e mantenha logs de hospedagem com acesso limitado. A política descreve o atendimento e os dados técnicos; faltam dados oficiais e retenção a preencher.

## Conteúdo a completar

Encontro confirmado pelo usuário: 26 de outubro de 2026, às 9h, Centro Técnico da Embalar em Rio Largo. Palestrantes: Iolanda Ângelo e Josiane Veloso. O conteúdo foi obtido da apresentação enviada. As artes individuais das palestrantes, fornecidas em 21/09/2026, são exibidas inteiras, sem recortes ou distorção.
Ainda preencher contato e endereço completo da Embalar/local, perfis sociais, URLs oficiais e imagem Open Graph. Completar a política de privacidade com razão social, CNPJ, endereço, e-mail, retenção e data de atualização.
O vídeo fornecido foi incluído em `assets/video/academia-embalar.mp4`, com controles, sem autoplay e com carregamento inicial apenas de metadados. Legendas/transcrição ainda precisam ser fornecidas ou revisadas. O modelo Event permanece comentado até completar endereço e URLs oficiais.
Confirmar se o número informado possui WhatsApp e recebe mensagens antes da publicação. O número foi preservado sem acrescentar dígitos.

## Validação

Execute `node tests/static.cjs` e `node --check js/script.js`, `node --check js/atendimento.js`, `node --check js/site-config.js`.
Leia `ENTREGA.md` para resultado e limites da verificação. A especificação vigente está em `ESPECIFICACAO-ATUALIZADA.md`.

## Publicação

Não houve publicação externa nesta tarefa. Publique a pasta em hospedagem estática após completar os dados e testar o WhatsApp. Em Apache, mantenha `.htaccess`; em outros ambientes, configure regras equivalentes. Não substitua apenas alguns arquivos de uma versão anterior: remova os endpoints e arquivos antigos para que não permaneçam acessíveis.
