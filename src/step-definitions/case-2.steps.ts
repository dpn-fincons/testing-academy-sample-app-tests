import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';
import { below, button, click, goto, text, textBox, write } from 'taiko';
import { HOST, NAME, PASSWORD, REPEAT_PASSWORD, SIGN_UP, USERNAME } from '../commons/constants';
import { Utils } from '../commons/utils';

When(/^User fills '(.+)' field with '(.+)'$/,
    async function (field: string, fillingText: string) {
        await write(fillingText, textBox(below(field)));
    }
);

When('User fills the fields',
    async function (signUpFields: DataTable) {
        const header = signUpFields.raw()[0];
        const name = signUpFields.rows()[0][0];
        const username = signUpFields.rows()[0][1];
        const password = signUpFields.rows()[0][2];
        const repeatPassword = signUpFields.rows()[0][3];

        await write(name, textBox(below(header[0])));
        await write(username, textBox(below(header[1])));
        await write(password, textBox(below(header[2])));
        await write(repeatPassword, textBox(below(header[3])));
    }
);

When(/^User presses 'Sign up' button below the form$/,
    async function () {
        await click(button('Sign up', below(text('Repeat Password'))));
    }
);

Then(/^'Signed in as (.+)' is shown in the page$/,
    async function (expectedText: string) {
        await Utils.textExist(expectedText);
    }
);

// aggiunta durante la lezione

let registeredName: string = undefined;

Given('the user is not signed in', async () => {
    await goto(HOST);
});

// When('the user signes up with name {string}, username {string} and password {string}',
When(/^the user signes up with name '(.+)', username '(.+)' and password '(.+)'$/,
    { timeout: 2 * 5000 }, // lo step impiega più di 5 secondi. senza questa linea il test fallisce per timeout
    async (name: string, username: string, password: string) => {
        registeredName = name;
        await click(button(SIGN_UP));
        await write(name, textBox(below(NAME)));
        await write(username, textBox(below(USERNAME)));
        await write(password, textBox(below(PASSWORD)));
        await write(password, textBox(below(REPEAT_PASSWORD)));
        await click(button(SIGN_UP, below(REPEAT_PASSWORD)));
    }
);

Then('the user is signed up and signed it', async () => {
    assert.ok(await text('Signed in as ' + registeredName).exists);
});