import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import * as dotenv from 'dotenv';

BeforeAll(async () => {
    dotenv.config();
});