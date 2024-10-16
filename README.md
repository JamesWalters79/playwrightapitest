# Introduction

A set of BDD style tests implemented in Typescript using Playwright and Cucumber that implement a number of test scenarios for the asteroids search endpoint (Asteroids - NeoWs) provided by NASA at https://api.nasa.gov/ 

# Running Tests 

**Run all tests with cucmber-js using npm**

*npm test*

**Run tagged tests with cucmber-js using npx**

*npx cucumber-js --tags "@lookup"*

# Allure Test Reporting

**Generate Allure Report from test results**

*allure generate allure--results --clean*

**Open Generated Report**

*allure open*