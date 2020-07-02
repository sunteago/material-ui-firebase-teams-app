import React, {useState} from 'react';
import Form from "../components/Form/Form";

function ForgotPassword(props) {
    const [email, setEmail] = useState('');

    const onForgotPasswordHandler = e => {
        e.preventDefault();
        console.log('Sending email ...')
    }
    return (<Form 
        mode="forgotpassword"
        email={email}
        setEmail={setEmail}
        onActionHandler={onForgotPasswordHandler}
    />);
}

export default ForgotPassword;