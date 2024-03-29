import { useState } from "react"

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    console.log(formFields)

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(password != confirmPassword)
        {
            alert("Passwords do not match")
            return
        }
        
        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, { displayName })
            setFormFields(defaultFormFields)
        }
        catch (error) {
            if(error.code == 'auth/email-already-in-use') {
                alert("Cannot create user, email is already in use")
            }
            else if (error.code == 'auth/weak-password') {
                alert("Cannot create user, password is too weak")
            }
            else {
                console.log("Error encountered in user creation", error)
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type='text' required onChange={handleChange} name="displayName" value={displayName}/>

                <FormInput label="Email" type='email' required onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={password}/>

                <FormInput label="Confirm Password" type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm