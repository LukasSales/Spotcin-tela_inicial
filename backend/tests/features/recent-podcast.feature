Feature: Podcasts Recentes

  Scenario: Ver os 5 podcasts escutados recentemente
    Given que o usuário está logado
    When uma requisição GET for enviada para "/podcasts/recent"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter uma lista de 5 podcasts
