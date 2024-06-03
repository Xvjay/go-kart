import LoginButton from "./componets/buttons/loginButton";
import RegisterButton from "./componets/buttons/registerButton";

export default function Home() {
    return (
        <body className="bg-blue-200">
            <div id="center">
                <div id='div2'>
                    <div className='input'>
                        <input type='text' placeholder="Enter Username/Email"></input>
                    </ div>
                    <br/>
                    <div className='input'>
                        <input type='password' placeholder="Enter Password"></input>
                    </ div>
                    <br/>
                    <LoginButton/><br/>
                    <RegisterButton/></div>

            </div>
        </body>
    );
}
