import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import * as dotenv from 'dotenv';

import { request, APIRequestContext, APIResponse, expect } from '@playwright/test';

const BASE_API_FEED_URL = "https://api.nasa.gov/neo/rest/v1/feed";
const BASE_API_BROWSE_URL = "https://api.nasa.gov/neo/rest/v1/neo/browse";
const BASE_API_LOOKUP_URL = "https://api.nasa.gov/neo/rest/v1/neo/";

let apiContext: APIRequestContext;
let response: APIResponse;
let searchParams: URLSearchParams;

Before(async () => {
    dotenv.config();
    apiContext = await request.newContext();
    searchParams = new URLSearchParams();
    searchParams.set('api_key', `${process.env.VALID_API_KEY}`);
});

After(async () => {
    apiContext.dispose();
    searchParams.delete('api_key');
    searchParams.delete('start_date');
    searchParams.delete('end_date');
});

Given('the Asteroids API is queried with no search parameters', async function () {    
    response = await apiContext.get(BASE_API_FEED_URL, { params: searchParams });
});

Given('the Asteroids API is queried with an invalid token', async function () {    
    searchParams.set('api_key',  `${process.env.INVALID_API_KEY}`);
    response = await apiContext.get(BASE_API_FEED_URL, { params: searchParams });
});

Given('the Asteroids API is queried with start date {string}', async function (start_date) {    
    searchParams.append('start_date',start_date);
    response = await apiContext.get(BASE_API_FEED_URL, { params: searchParams });
});

Given('the Asteroids API is queried with end date {string}', async function (end_date) {    
    searchParams.append('end_date',end_date);
    response = await apiContext.get(BASE_API_FEED_URL, { params: searchParams });
});

Given('the Asteroids API is queried with start date {string} and end date {string}', async function (start_date,end_date) {    
    searchParams.append('start_date',start_date);
    searchParams.append('end_date',end_date);
    response = await apiContext.get(BASE_API_FEED_URL, { params: searchParams });
});

Given('the Asteroids API is browsed', async function () {    
    response = await apiContext.get(BASE_API_BROWSE_URL, { params: searchParams });
});

Given('the Asteroids API is asked for an asteroid with ID {string}', async function (ID) {    
    response = await apiContext.get(BASE_API_LOOKUP_URL + ID, { params: searchParams });
});

Then('the response status is {int}', async function (status) {    
    expect(response.status()).toBe(status);
});

Then('many asteroids are returned', async function () {           
    const responseBody = await response.json();
    expect(responseBody.element_count).toBeGreaterThan(0);
});

Then('the asteroid count is between {int} and {int}', async function (min,max) {
    const responseBody = await response.json();
    expect(responseBody.element_count).toBeGreaterThan(min);
    expect(responseBody.element_count).toBeLessThan(max);
});

Then('the HTTP error is {string}', async function (error) {    
    const responseBody = await response.json();
    expect(responseBody.http_error).toBe(error);
});

Then('the error message is {string}', async function (message) {
    const responseBody = await response.json();
    expect(responseBody.error_message).toBe(message);    
});
