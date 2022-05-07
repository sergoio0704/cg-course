export default class Shape {
    #type 
    
    constructor(type) {
        this.#type = type
    }

    getType = () => this.#type
}