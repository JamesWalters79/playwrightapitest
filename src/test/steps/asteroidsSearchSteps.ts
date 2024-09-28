import { Given, When, Then, Before } from '@cucumber/cucumber';
import { BeforeAll } from '@cucumber/cucumber';

import { request, APIRequestContext, APIResponse, expect } from '@playwright/test';

const ASTEROIDS_API_KEY = "4oHMkn6CWYCvBFcX5GWusj5pNGgLFTY1LiWgg2n5";
const BASE_API_URL = "https://api.nasa.gov/neo/rest/v1/feed";

let apiContext: APIRequestContext;
let response: APIResponse;

BeforeAll(async () => {
    apiContext = await request.newContext();
});

Given('the Asteroids API is queried with no search parameters', async function () {    
    const searchParams = new URLSearchParams();
    searchParams.set('api_key', ASTEROIDS_API_KEY);
    response = await apiContext.get(BASE_API_URL, { params: searchParams });
});

Then('the response status code is {string}', async function (status_code) {
    const responseCode = await response.status();
    await expect(responseCode.toString()).toEqual(status_code);
});
