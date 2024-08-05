class UserModel {


    created_at: string
    email: string | null
    first_name: string | null
    id: number
    last_name: string | null
    password: string | null

    constructor(id: number, first_name: string , last_name: string, email: string, password:  string, created_at: string){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email,
        this.password = password
        this.created_at = created_at
        
    }
}