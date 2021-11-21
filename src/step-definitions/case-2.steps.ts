import {DataTable, Then, When} from '@cucumber/cucumber';
import {below, button, click, text, textBox, write} from 'taiko';
import {Utils} from '../commons/utils';

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
