export class GetLearningResources {
    #learningResourceRepo;

    constructor({ learningResourceRepo }) {
        this.#learningResourceRepo = learningResourceRepo;
    }

    async execute() {
        return this.#learningResourceRepo.getAll();
    }
}
