import { Given, Then, When } from '@cucumber/cucumber';
import { button, click, goto } from 'taiko';
import { HOST } from '../commons/constants';
import { Utils } from '../commons/utils';

const SIGNED_IN = 'Signed in';

Given('User is in home page',
    async function () {
        await goto(HOST);
    }
);

Given('User is not authenticated',
    async function () {
        await Utils.textNotExist(SIGNED_IN);
    }
);

When(/^User presses '(.+)' button$/,
    async function (buttonText: string) {
        await click(button(buttonText));
    }
);

Then(/^Error message is shown '(.+)'$/,
    async function (errorMessage: string) {
        await Utils.textExist(errorMessage);
    }
);
