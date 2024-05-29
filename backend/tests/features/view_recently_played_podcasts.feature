Scenario: Ver a Lista de Podcasts Escutados Recentemente 

Given que o usuário "John" está na página inicial da plataforma de streaming de música. 
And o sistema possui dados atualizados sobre os podcasts que o usuário escutou recentemente. 
When o usuário seleciona a opção "Ver mais" na seção de "Podcasts Recentes". 
Then o sistema deve exibir uma página com a lista dos podcasts escutados recentemente. 