Feature: Pagina Inicial - Músicas Recomendadas

  Scenario: Ver as 5 músicas recomendadas
    Given que o usuário está logado
    When uma requisição GET for enviada para "/musics/recommended"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter uma lista de 5 músicas

    Feature: Ver as músicas recomendadas


