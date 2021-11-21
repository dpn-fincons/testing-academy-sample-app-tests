import * as assert from 'assert';
import {text} from 'taiko';

export class Utils {
    static async textExist(searchingText: string): Promise<void> {
        assert.equal(await text(searchingText).exists(), true);
    }

    static async textNotExist(searchingText: string): Promise<void> {
        assert.equal(await text(searchingText).exists(100, 500), false);
    }

}
