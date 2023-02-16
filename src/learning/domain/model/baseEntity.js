import { lazy, string } from 'yup';

export const NEW_ID = '';

export class BaseEntity {
    static #VALIDATION_SCHEMA = lazy((value) =>
        value ? string().trim().uuid() : string()
    );

    #id;

    constructor(id) {
        if (this.constructor === BaseEntity) {
            throw new Error("Can't instantiate abstract class!");
        }
        BaseEntity.#VALIDATION_SCHEMA.validateSync(id);
        this.#id = id;
    }

    isNew() {
        return !this.#id;
    }

    getId() {
        return this.#id;
    }
}
