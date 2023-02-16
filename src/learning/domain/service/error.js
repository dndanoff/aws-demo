export class ApiError {
    #message;
    #statusCode;
    #details;

    constructor({
        message = 'Unexpected internal server error.',
        statusCode = 500,
        details = undefined,
    }) {
        const body = JSON.stringify({ message });
        this.#statusCode = statusCode;
        this.#message = message;
        this.#details = details;
        this.body = body;
        this.headers = {
            'Content-Type': 'application/json',
        };
    }

    getMessage() {
        return this.#message;
    }

    getStatusCode() {
        return this.#statusCode;
    }

    getDetails() {
        return { ...this.#details };
    }

    toJSON() {
        return {
            headers: { 'Content-Type': 'application/json' },
            statusCode: this.#statusCode,
            body: { message: this.#message, details: this.#details },
        };
    }
}
