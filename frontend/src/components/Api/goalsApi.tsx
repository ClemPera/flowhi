let key = "da39a3ee5e6b4b0d3255bfef95601890afd80709" //TODO: change when login implemented

export class goalsApi {
    static async get(fieldId: number, date: Date): Promise<any> {
        let data:any = null;
        await fetch("http://localhost:3000/goals?fieldId=" + fieldId
            + "&date=" + date
            + "&key=" + key,
            { "method": "GET" }
        )
        .then(response => {
            if (!response.ok) throw new Error("Issue fetching goal from api")
            return response.json();
        })
        .then(d => {
            data = d;
        })
        .catch(error => console.error("Fetch error:", error));

        return data;
    }

    static async post(fieldId: number, goal: number, date: Date){
        fetch("http://localhost:3000/goals?fieldId=" + fieldId
            + "&goal=" + goal
            + "&date=" + date
            + "&key=" + key,
            {"method":"POST"}
        )
    }
}
