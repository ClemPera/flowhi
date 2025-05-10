let key = "da39a3ee5e6b4b0d3255bfef95601890afd80709" //TODO: change when login implemented

export class goalsApi {
    static async get(fieldId: number, date: Date): Promise<any> {
        let data:any = null;
        // Format date properly for backend
        const formattedDate = date.toISOString().split('T')[0];
        console.log("Sending formatted date to goals API:", formattedDate, "from original:", date, "ISO:", date.toISOString());

        await fetch("http://localhost:3000/goals?fieldId=" + fieldId
            + "&date=" + formattedDate
            + "&key=" + key,
            { "method": "GET" }
        )
        .then(response => {
            if (!response.ok) throw new Error("Issue fetching goal from api")
            return response.text();
        })
        .then(d => {
            if(d) {
                data = JSON.parse(d);
                console.log("Goals API response:", data);
            } else {
                console.log("Goals NULL API response:", data);
                data = null;
            }
        })
        .catch(error => console.error("Fetch error:", error, 'fieldId: ', fieldId));

        return data;
    }

    static async post(fieldId: number, goal: number, date: Date){
        // Format date properly for backend
        const formattedDate = date.toISOString().split('T')[0];
        console.log("Posting goal with formatted date:", formattedDate, "from original:", date);

        fetch("http://localhost:3000/goals?fieldId=" + fieldId
            + "&goal=" + goal
            + "&date=" + formattedDate
            + "&key=" + key,
            {"method":"POST"}
        )
    }
}
