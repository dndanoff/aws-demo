import { ValidationError } from 'yup';
import { mockInstance } from '../../../../../../tests/mocks.js';
import { CreateLearningResource } from '../createLearningResource.js';
import { LearningResourceRepo } from '../../../../application/repository/aws/learningResourceRepo.js';

const testSetup = (
    learningResourceRepo = mockInstance(LearningResourceRepo)
) => {
    const objUnderTest = new CreateLearningResource({
        learningResourceRepo,
    });
    return { objUnderTest, learningResourceRepo };
};

describe('CreateLearningResource', () => {
    it('should throw validation error when courseName is missing', async () => {
        const { objUnderTest } = testSetup();

        const res = objUnderTest.execute({
            platform: 'udemy.com',
            url: 'www.udemy.com/courses/aws-saa-doe',
            account: 'backend_dev@dreamix.eu',
            expertise: 'backend',
            seniorityLevel: 'senior',
        });

        await expect(res).rejects.toThrow(ValidationError);
    });
});
