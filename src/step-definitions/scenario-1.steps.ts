import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';
import { below, button, click, goto, text, textBox, write } from 'taiko';
import {CONFIRM, HOST, PASSWORD, SIGN_IN, SIGN_OUT, USERNAME} from '../commons/constants';

const SIGNED_TESTER = 'Signed in as Tester';

// Given('User is in home page',
//     async function () {
//         await goto(HOST);
//     }
// );

// Given('User is not authenticated',
//     async function () {
//         await textExist(SIGNED_TESTER, false);
//     }
// );

// When('User presses \'Sign in\' button',
//     async function () {
//         await click(button(SIGN_IN));
//     }
// );

When('User fills username field with {string}',
    async function (username: string) {
        await write(username, textBox(below(USERNAME)));
    }
);

When(/^User fills password field with '(.+)'$/,
    async function (password: string) {
        await write(password, textBox(below(PASSWORD)));
    }
);

When('User signs in with Tester username and password',
    async function () {
        await click(button(SIGN_IN));
        await write('cucumber', textBox(below(USERNAME)));
        await write('demo', textBox(below(PASSWORD)));
        await click(button(CONFIRM));
    }
);

When(/^User signs in with username '(.+)' and password '(.+)'$/,
    async function (username: string, password: string) {
        await click(button(SIGN_IN));
        await write(username, textBox(below(USERNAME)));
        await write(password, textBox(below(PASSWORD)));
        await click(button(CONFIRM));
    }
);

Then('"Signed in as Tester" is shown in the page',
    async function () {
        await textExist(SIGNED_TESTER, true);
    }
);

Then(/^'(.+)' button is available$/,
    async function (buttonText: string) {
        await buttonExist(buttonText);
    }
);

Then('User is signed in',
    async function () {
        await textExist(SIGNED_TESTER, true);
        await buttonExist(SIGN_OUT);
    }
);

async function textExist(searchingText: string, expected: boolean): Promise<void> {
    assert.equal(await text(searchingText).exists(100, 500), expected);
}

async function buttonExist(buttonText: string): Promise<void> {
    // assert.equal(await button(buttonText).exists(), true);
    assert.ok(await button(buttonText).exists());
}
