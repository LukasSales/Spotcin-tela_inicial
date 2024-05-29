Scenario: Ver a Lista de Músicas Tocadas Recentemente 

Given que o usuário "John" está na página inicial da plataforma de streaming de música. 
And o sistema possui dados atualizados sobre as músicas que o usuário escutou recentemente. 
When o usuário seleciona a opção "Ver mais" na seção de "Tocadas Recentemente". 
Then o sistema deve exibir uma página com a lista das músicas tocadas recentemente. 