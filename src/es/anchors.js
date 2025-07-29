import Base from './base';

export default class Anchors extends Base
{
    constructor() {
        super({
            selectors: ['a'],
            type: 'Anchor',
        });

        this.name = "Anchors";
    }
}
