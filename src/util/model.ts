
class QueryResponse {

    public query: string
    public paraphrase: boolean 
    public response: string | undefined 

    constructor(query: string, paraphrase: boolean){
        this.query = query
        this.paraphrase = paraphrase
    }

    

}