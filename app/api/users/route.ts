import {NextResponse} from "next/server";
import pool from "@/app/libs/mysql";


export async function POST(request : Request) {
    const db = await pool.getConnection();
    const {Name, Email, Password , Password1} = await request.json();

    try {
        const query1 = 'Select Email from users where Email = (?)'
        const [result1] : any = await db.execute(query1, [Email])
        const res2 = result1.map((row: { Email: any; }) => row.Email);
        console.log(res2[0].length)
        if(res2 == ""){
            return NextResponse.json({
                message: "Enter an Email"
            }, {status: 201});
        }
       

        return NextResponse.json({
            message: "This Email has already been used"
        }, {status: 201});

    } catch {
        try{
            const query1 = 'Select Name from users where Name = (?)'
            const [res] : any = await db.execute(query1, [Name])
            const res2 = res.map((row: { Name: any }) => row.Name);

            console.log(res2[0].length)

            if(res2 == ""){
                return NextResponse.json({
                    message: "Enter a Username"
                }, {status: 201});


            }
            return NextResponse.json({
                message: "This Username has already been used"
            }, {status: 201});

        }catch{
            console.log(Password1)
            console.log(Password)
            if(Password == "" || Password1 == ""){
                return NextResponse.json({ message: "Please fill out both Passwords" }, { status: 201 });


            }
            if(Password == Password1 && Password != "" || Password1 != ""){
                console.log("yes")
                const query = 'INSERT INTO users (Name, Email, Password) VALUES (?, ?, ?)';
                const [result] = await db.execute(query, [Name, Email, Password]);
                return NextResponse.json({ message: "User created successfully" }, { status: 200 });


            }else{
                console.log("Paswords are not the same")               
                 return NextResponse.json({ message: "Passwords are not the same" }, { status: 201 });

            }
           

        }

    }
}
