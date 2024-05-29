Scenario: Acessar Recomendações Personalizadas

Given que o usuário "Joh" está logado na plataforma de streaming de música. 
And o sistema possui acesso aos dados do perfil do usuário, histórico de reprodução e interações anteriores. 
When o usuário acessa a página inicial da plataforma de streaming. 
Then o sistema deve analisar os dados do perfil do usuário e histórico de escuta. 
And o usuário deve visualizar 5 recomendações de música personalizadas.