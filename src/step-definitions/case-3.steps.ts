import {DataTable, Given, Then, When} from '@cucumber/cucumber';
import * as assert from 'assert';
import {$, below, click, dropDown, Element, goto, listItem, tableCell, textBox, write} from 'taiko';
import {HOST} from '../commons/constants';

const TABLE_ID = 'pr_id_1-table';
const TABLE_RESULT_ROW_SELECTOR = '#' + TABLE_ID + ' > tbody > tr';

Given(/^(.+) is authenticated$/,
    async function (user: string) {
        await goto(HOST + '/auto-sign-in');
    }
);

Given(/^.+ is in Results Page$/,
    async function () {
        await click('See Results');
    }
);

When(/^Tester filters the result by (.+) '(.+)'$/,
    async function (field: string, value: string) {
        await filterResult(field, value);
    }
);

When(/^Tester fills the filter with (.+) as '(.+)'$/,
    async function (field: string, value: string) {
        await filterResult(field, value);
    }
);

Then('The results are shown',
    async function (resultTable: DataTable) {
        await checkTable(resultTable);
    }
);

Then(/^No results are shown$/,
    async function () {
        const elements = await $(TABLE_RESULT_ROW_SELECTOR).elements(1000, 1000);
        assert.equal(elements.length, 1);
        assert.equal(await elements[0].text(), 'No result available');
    }
);

async function filterResult(field: string, value: string) {
    if (field === 'Status') {
        // const stDropdown = dropDown(below(field)).select(value);
        await click('Any', below(field));
        await click(listItem(value));
    } else {
        await write(value, textBox(below(field)));
    }
}

async function checkTable(resultTable: DataTable) {
    const tableRows: Element[] = await $(TABLE_RESULT_ROW_SELECTOR).elements();
    assert.equal(tableRows.length, resultTable.rows().length);

    for (let i = 0; i < resultTable.rows().length; i++) {
        const row = resultTable.rows()[i];
        for (let j = 0; j < row.length; j++) {
            const cell = tableCell({row: i + 1, col: j + 1}, TABLE_ID);
            // const cell = $(`${TABLE_RESULT_ROW_SELECTOR}:nth-child(${i + 1}) > td:nth-child(${j + 1})`)
            if (j != 3) {
                const fieldValue = row[j];
                const cellValue = await cell.text();
                assert.equal(cellValue, fieldValue);
            } else {

            }
        }
    }
}
