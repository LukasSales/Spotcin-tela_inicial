Feature: Playlists Aleatórias

  Scenario: Ver as 5 playlists aleatórias do usuário
    Given que o usuário está logado
    When uma requisição GET for enviada para "/playlists/random"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter uma lista de 5 playlists
