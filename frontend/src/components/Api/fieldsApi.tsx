export class fieldsApi {
    static async getAll(): Promise<any[]> {
        let data:any[] = [];
        await fetch("http://localhost:3000/fields", { "method": "GET" })
            .then(response => {
                if (!response.ok) throw new Error("Issue fetching data from api (network response !ok)")
                return response.json();
            })
            .then(d => {
                data = d
            })
            .catch(error => console.error("Fetch error:", error)); // Handle errors
        
        return data
    }

    static async getLast(): Promise<any[]> {
        let data:any[] = [];
        await fetch("http://localhost:3000/fields?lastOne=1", { "method": "GET" })
            .then(response => {
                if (!response.ok) throw new Error("Issue fetching data from api (network response !ok)")
                return response.json();
            })
            .then(d => {
                data = d
            })
            .catch(error => console.error("Fetch error:", error)); // Handle errors
        
        return data
    }

    static async post(name: string, kind: string, size: number){
        if(name.length > 25) return 1;

        fetch("http://localhost:3000/fields?name=" + name 
                + "&kind=" + kind 
                + "&size=" + size, 
            {"method":"POST"}
        )
        return 0;
    }
    
    static async delete(id: number){
        fetch("http://localhost:3000/fields?id=" + id,
            {"method":"DELETE"}
        )
    }
}