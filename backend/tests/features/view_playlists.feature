Scenario: Ver a Lista de Playlists 

Given que o usuário "John" está na página inicial da plataforma de streaming de música. 
And o sistema possui dados atualizados sobre as playlists que o usuário criou. 
When o usuário seleciona a opção "Ver mais" na seção de "Suas Playlists". 
Then o sistema deve exibir uma página com a lista das suas playlists.