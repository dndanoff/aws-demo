import { object, string, date } from 'yup';
import { BaseEntity, NEW_ID } from './baseEntity.js';

export class LearningResource extends BaseEntity {
    static #isInternalConstructing = false;
    static #VALIDATION_SCHEMA = object().shape({
        courseName: string().trim().required(),
        platform: string().trim().required(),
        url: string().trim().required(),
        account: string().trim().required(),
        seniorityLevel: string().trim().required(),
        expertise: string().trim().required(),
        updatedAt: date().required(),
    });

    #props;

    constructor(id, props) {
        if (!LearningResource.#isInternalConstructing) {
            throw new TypeError('Invoking private constructor');
        }
        super(id);
        this.#props = props;
    }

    static copy(id, learningResources, updatedProps = {}) {
        return LearningResource.create(id, {
            ...learningResources.#props,
            ...updatedProps,
        });
    }

    static createNew(props) {
        return LearningResource.create(NEW_ID, props);
    }

    static create(id, props) {
        LearningResource.#VALIDATION_SCHEMA.validateSync(props, {
            abortEarly: false,
        });

        LearningResource.#isInternalConstructing = true;
        const instance = new LearningResource(id, props);
        LearningResource.#isInternalConstructing = false;
        return instance;
    }

    getCourseName() {
        return this.#props.courseName;
    }

    getPlatform() {
        return this.#props.platform;
    }

    getUrl() {
        return this.#props.url;
    }

    getAccount() {
        return this.#props.account;
    }

    getSeniorityLevel() {
        return this.#props.seniorityLevel;
    }

    getExpertise() {
        return this.#props.expertise;
    }

    getUpdatedAt() {
        return this.#props.updatedAt;
    }

    toJSON() {
        return { id: this.getId(), ...this.#props };
    }
}
