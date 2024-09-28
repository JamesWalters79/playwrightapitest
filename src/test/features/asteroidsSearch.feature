Feature: Asteroids Search

Scenario: Asteroids API Query with no search parameters
    Given the Asteroids API is queried with no search parameters
    Then the response status code is "200"