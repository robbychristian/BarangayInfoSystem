import React from 'react'
import ReactDOM from 'react-dom'

const RegisterPage = () => {
    return (
        <div>
            tangina working
        </div>
    );
}

export default RegisterPage;

if(document.getElementById('RegisterPage')) {
    ReactDOM.render(<RegisterPage />, document.getElementById("RegisterPage"))
}