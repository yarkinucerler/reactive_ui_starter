/**
 * Created by Yarkin UCERLER on 11.08.2018.
 */


document.componentRegistry = { };
document.nextId = 0;

export default class ReactiveUI {
    constructor () {
        this.$template = '';
        const arg = arguments[0];
        for(let prop in arg) {
            this.$el = prop === 'el' ? arg[prop] : null;
            this.$data = prop === 'data' ? arg[prop] : null;
            this.$component = prop === 'component' ? arg[prop] : null;
            this.$components = prop === 'components' ? arg[prop] : null;
        }
    }

    $mount() {
        const arg = arguments[0];
        if(this.$component || this.$components) {
            if(this.$components) {
                for(let i in this.$components) {
                    document.querySelector(arg).innerHTML += new this.$components[i]().$template;
                }
            }
            else document.querySelector(arg).innerHTML = new this.$component().$template;
        }
    }
}

export class Component extends ReactiveUI{
    constructor() {
        super();
        this._id = ++document.nextId;
        document.componentRegistry[this._id] = this;
    }

    get tempalate() {
        return this.$template;
    }

    set tempalate(newTemplate) {
        this.$template = newTemplate;
    }
}