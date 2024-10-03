Feature: Asteroids Search

Scenario: Asteroids API Query with no search parameters
    Given the Asteroids API is queried with no search parameters
    Then the response status is 200
    And many asteroids are returned
    And the asteroid count is between 100 and 200