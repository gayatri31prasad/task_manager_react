import React from 'react'

function Login() {
    const [userData, setUserData] = React.useState({
        email: '',
        password: '',
    })

    const validateUser = () => {

    }
    return (
        <div className='MainDiv'>
            <div className='centerDiv'>
                <h2>User Login</h2>
                <div>
                    <p>Email</p>
                    <input
                        type='email'
                        placeholder='Enter your email address'
                        value={userData.email}
                        onChange={(e) => {
                            setUserData((data)=>({
                                ...data,
                                email: e.target.value
                            }))
                        }}
                    />
                </div>
                <div>
                    <p>Password</p>
                    <input
                        type='email'
                        placeholder='Enter your password'
                        value={userData.password}
                        onChange={(e) => {
                            setUserData((data)=>({
                                ...data,
                                password: e.target.value
                            }))
                        }}
                    />
                </div>
                <button> Login </button>
            </div>
        </div>
    )
}

export default Login