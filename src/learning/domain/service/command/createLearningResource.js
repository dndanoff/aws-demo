import { object, string } from 'yup';
import { LearningResource } from '../../model/learningResource.js';

export class CreateLearningResource {
    static #VALIDATION_SCHEMA = object().shape({
        courseName: string().trim().required(),
        platform: string().trim().required(),
        url: string().trim().required(),
        account: string().trim().required(),
        seniorityLevel: string().trim().required(),
        expertise: string().trim().required(),
    });

    #learningResourceRepo;

    constructor({ learningResourceRepo }) {
        this.#learningResourceRepo = learningResourceRepo;
    }

    async execute(learningResourceInputParams) {
        const valdiatedParams =
            await CreateLearningResource.#VALIDATION_SCHEMA.validate(
                learningResourceInputParams,
                { abortEarly: false }
            );

        const learningResource = LearningResource.createNew({
            ...valdiatedParams,
            updatedAt: new Date(),
        });

        return this.#learningResourceRepo.create(learningResource);
    }
}
