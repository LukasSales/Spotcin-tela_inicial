Scenario: Busca por Artista Específico 

Given que o usuário "John" está na página inicial da plataforma de streaming de música. 
And a plataforma possui uma barra de pesquisa funcional integrada à página inicial. 
When o usuário digita o nome do artista "Imagine Dragons" na barra de pesquisa. 
And ele seleciona a opção "Buscar". 
Then o sistema deve processar a solicitação de pesquisa e exibir os resultados correspondentes, incluindo artistas que correspondem à consulta do usuário. 
And o usuário deve encontrar facilmente o artista desejado e acessar seu perfil diretamente a partir da página inicial. 