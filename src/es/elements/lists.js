import Base from './base';

export default class Lists extends Base {
    constructor() {
        super({
            selectors: ['ol', 'ul'],
            type: 'List',
        });

        this.name = "Lists";
    }
}
