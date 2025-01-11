export class dataApi {
    static async get(id: number): Promise<any[]> {
        let data:any[] = [];
        await fetch("http://localhost:3000/data?fieldId=" + id, { "method": "GET" })
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
        
    static async post(fieldId: number, data: number){
        //Check if existing
        fetch("http://localhost:3000/data?fieldId=" + fieldId 
            + "&data=" + data,
            {"method":"POST"}
        )
    }

    // static async put(fieldId: number, data: number){
    //     //Check if existing
    //     fetch("http://localhost:3000/data?fieldId" + fieldId 
    //         + "&data=" + data,
    //         {"method":"PUT"}
    //     )
    // }
}