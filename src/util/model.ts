
export class QueryResponse {

    private query: string
    private isParaphrase: string
    private response: string

    constructor(query: string, isParaphrase: string, response: string) {
        this.query = query
        this.isParaphrase = isParaphrase
        this.response = response
    }

    getQuery(): string {
        return this.query
    }

    getisParaphrase(): string {
        return this.isParaphrase
    }
    getResponse(): string {
        return this.response
    }

}