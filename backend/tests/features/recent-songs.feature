Feature: Pagina inicial - Músicas Recentes

  Scenario: Ver as 5 músicas escutadas recentemente
    Given que o usuário está logado
    When uma requisição GET for enviada para "/musics/recent"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter uma lista de 5 músicas
