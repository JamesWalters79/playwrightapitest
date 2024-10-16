@allure.label.epic:AsteroidsNeoWs
Feature: Asteroids NeoWS 

@allure.label.feature:Query
Scenario: Asteroids API Query with no search parameters
    Given the Asteroids API is queried with no search parameters
    Then the response status is 200
    And many asteroids are returned
    And the asteroid count is between 100 and 200

@allure.label.feature:Query
Scenario: Asteroids API Query with start date
    Given the Asteroids API is queried with start date "2023-11-10"
    Then the response status is 200
    And many asteroids are returned
    And the asteroid count is between 100 and 200

@allure.label.feature:Query
Scenario: Asteroids API Query with end date
    Given the Asteroids API is queried with end date "2023-11-10"
    Then the response status is 400
    And the HTTP error is "BAD_REQUEST"
    And the error message is "Date Format Exception - Expected format (yyyy-mm-dd) - The Feed date limit is only 7 Days"

@allure.label.feature:Query
Scenario: Asteroids API Query with valid range
    Given the Asteroids API is queried with start date "2023-11-09" and end date "2023-11-10"
    Then the response status is 200
    And many asteroids are returned
    And the asteroid count is between 30 and 50

@allure.label.feature:Query
Scenario: Asteroids API Query with invalid range
    Given the Asteroids API is queried with start date "2023-11-09" and end date "2023-12-10"
    Then the response status is 400
    And the HTTP error is "BAD_REQUEST"
    And the error message is "Date Format Exception - Expected format (yyyy-mm-dd) - The Feed date limit is only 7 Days"

@allure.label.feature:Query
@allure.label.story:Authentication
Scenario: Asteroids API Query with invalid token
    Given the Asteroids API is queried with an invalid token
    Then the response status is 403

@allure.label.feature:Browse
Scenario: Asteroids API browse
    Given the Asteroids API is browsed
    Then the response status is 200

@allure.label.feature:Lookup
Scenario: Asteroids API lookup by ID
    Given the Asteroids API is asked for an asteroid with ID "3542519"
    Then the response status is 200
