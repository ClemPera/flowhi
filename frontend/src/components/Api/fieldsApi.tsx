let key = "da39a3ee5e6b4b0d3255bfef95601890afd80709" //TODO: change when login implemented
export class fieldsApi {
    static async getAll(): Promise<any[]> {
        let data:any[] = [];
        await fetch("http://localhost:3000/fields?key=" + key, { "method": "GET" })
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
        await fetch("http://localhost:3000/fields?lastOne=1&key=" + key, { "method": "GET" })
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

    static async post(name: string, kind: string, size: number, weeklyGoal?: number){
        if(name.length > 25) return 1;

        fetch("http://localhost:3000/fields?name=" + name
                + "&kind=" + kind
                + "&size=" + size
                + "&weeklyGoal=" + (weeklyGoal || 0)
                + "&key=" + key,
            {"method":"POST"}
        )
        return 0;
    }

    static async delete(id: number){
        fetch("http://localhost:3000/fields?id=" + id + "&key=" + key,
            {"method":"DELETE"}
        )
    }
}
