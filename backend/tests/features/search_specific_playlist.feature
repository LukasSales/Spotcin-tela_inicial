Scenario: Busca por Playlist Específica 

Given que o usuário "John" está na página inicial da plataforma de streaming de música. 
And a plataforma possui uma barra de pesquisa funcional integrada à página inicial. 
When o usuário digita o nome da playlist "Top Hits 2024" na barra de pesquisa. 
And ele seleciona a opção "Buscar". 
Then o sistema deve processar a solicitação de pesquisa e exibir os resultados correspondentes, incluindo playlists que correspondem à consulta do usuário. 
And o usuário deve encontrar facilmente a playlist desejada e acessá-la diretamente a partir da página inicial.