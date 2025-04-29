let key = "da39a3ee5e6b4b0d3255bfef95601890afd80709" //TODO: change when login implemented

export class dataApi {
    static async get(id: number, date: Date): Promise<any[]> {
        let data:any[] = [];
        await fetch("http://localhost:3000/data?fieldId=" + id + "&date=" + date + "&key=" + key, { "method": "GET" })
        .then(response => {
                if (!response.ok) throw new Error("Issue fetching data from api (network response !ok)")
                return response.text();
            })
            .then(d => {
                if(d)
                    data = JSON.parse(d);
                else
                    data = [-1];
            })
            .catch(error => console.error("Fetch error:", error, 'id: ', id)); // Handle errors
        
        return data
    }
        
    static async post(fieldId: number, data: number, date: Date){
        fetch("http://localhost:3000/data?fieldId=" + fieldId 
            + "&data=" + data + "&date=" + date + "&key=" + key,
            {"method":"POST"}
        )
    }
}