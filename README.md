# Be more productive
*Gerencie seus agendamentos de forma simples*

## Sobre o projeto
O projeto "Be" é uma iniciativa para simplificar a organização de agendamento de tarefas e trabalhos, com foco nas classes D e E. Desse modo, tem um forte cunho social, que busca entender as fragilidades tecnológicas, comportamentais e econônicas, utilizando a tecnologia como instrumento de libertação.

## Composição
De modo geral, "Be" possui uma parte do cliente (repositório em breve) e uma parte de serviço. Este repositório cuida da API, responsável por permitir o correto funcionamento das autenticações e manipulações de informações.

Para lidar com usuários, atualmente foi adotado o Firebase, que permite grande tração nesta tarefa. Já para o armazenamento foi adotado o MongoDB, permitindo alta escalabilidade nos documentos de agendamento, bem como flexibilidade para implementações de features e informações que podem ser geradas pelos usuários.

## Rotas
O arquivo `routes.ts` concentra todas as rotas da API, prezando pela legibilidade semântica. Por se tratar de uma API REST, utiliza JSON para transferir arquivos, de modo que as validações dos corpos enviados nas requisições foram previamente definidas no diretório `validators`. Segue uma rápida explicação das rotas.

### Gerenciamento de usuários

**`POST /login`**: Responsável por prover a autenticação de um usuário. Recebe no corpo:
- user: E-mail do usuário cadastrado no sistema
- pass: Senha do usuário informado

**`POST /user`**: Responsável por cadastrar um novo usuário no sistema. Recebe no corpo:
- user: E-mail do usuário cadastrado no sistema
- pass: Senha do usuário informado

**`POST /pass`**: Responsável por fazer o reset de senha, em caso de esquecimento. Um e-mail é enviado para o usuário, via Firebase, onde poderá fazer a troca por uma nova senha.
- user: E-mail do usuário cadastrado no sistema

**`PUT /pass`**: Responsável por alterar a senha atual. Recebe no corpo:
- user: E-mail do usuário cadastrado no sistema
- pass: Senha atual do usuário informado
- newPass: Senha nova para ser utilizada

### Gerenciamento de marcações

**`POST /schedule`**: Cria uma nova marcação de compromisso na agenda. Recebe no corpo:
- uid: Texto que contêm o id do usuário, obtido pela rota `/login` via Firebase
- note: Texto para detalhar algo sobre a marcação
- title: Texto com o título da marcação
- startDate: Texto datetime em formato ISO (2022-05-22 11:35) que informa a data e hora de início
- endDate: Texto datetime em formato ISO (2022-05-22 11:35) que informa a data e hora de finalização
- clientPhone: Texto com o número do contato para comunicação sobre o compromisso

**`PUT /schedule`**: Faz a alteração em uma marcação específica. Recebe no corpo:
- uid: Texto que contêm o id do usuário, obtido pela rota `/login` via Firebase
- aid: Texto que contêm o id da marcação, obtido pela rota `/schedule/:uid`
- note: Texto para detalhar algo sobre a marcação
- title: Texto com o título da marcação
- startDate: Texto datetime em formato ISO (2022-05-22 11:35) que informa a data e hora de início
- endDate: Texto datetime em formato ISO (2022-05-22 11:35) que informa a data e hora de finalização
- clientPhone: Texto com o número do contato para comunicação sobre o compromisso

**`DEL /schedule`**: Remove uma marcação específica da agenda. Recebe no corpo:
- uid: Texto que contêm o id do usuário, obtido pela rota `/login` via Firebase
- aid: Texto que contêm o id da marcação, obtido pela rota `/schedule/:uid`
- dateKey: Texto com chave de data em formato ISO (2022-05-22) para alocação da marcação na agenda 

**`GET /schedule/:uid`**: recupera a agenda com marcações para um determinado usuário. Recebe como parâmetro de rota:
- uid: Texto que contêm o id do usuário, obtido pela rota `/login` via Firebase

## Abertura
Não há outra forma de contribuir com a sociedade e evitar a exploração se não por meio da transparência. Por isso, todo o código do projeto segue aberto, sendo a comunidade livre para apoiar na sua construção e melhoria.