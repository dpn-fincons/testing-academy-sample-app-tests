import {After, AfterAll, Before, BeforeAll} from '@cucumber/cucumber';
import {ITestCaseHookParameter} from '@cucumber/cucumber/lib/support_code_library_builder/types';
import {closeBrowser, openBrowser} from 'taiko';

const browserOptions = {
    headless: false,
    args: [
        '--window-size=1440,900',
        // '--start-fullscreen'
    ]
};

BeforeAll(async (): Promise<void> => {
    console.log(' == Opening Browser ==');
    await openBrowser(browserOptions);
})

Before((scenario: ITestCaseHookParameter) => {
    console.log('\tRunning:', scenario.pickle.name);
});

After((scenario: ITestCaseHookParameter) => {
    console.log('\n\tResult:', scenario.result?.status);
});

AfterAll(async (): Promise<void> => {
    await closeBrowser();
    console.log('== Browser closed ==');
});
