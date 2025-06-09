import {React,useState} from 'react'

export default function Password_reset() {
    const [error,setError]=useState('')
    const [email,setEmail]=useState('')
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response=await fetch('http://localhost:5000/api/reset_request',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                credentials:'include',
                body:JSON.stringify({'email':email}),
        })
        const data=await response.json()
        if (response.ok){
            alert('Email sent. Check mailbox')
        }else{
            setError(data.error)
            console.log(data.error)
        }
        }catch(err){
            console.log(err)
        }
    }
    const handleChange=(e)=>{
        setEmail(e.target.value)
    }
  return (
    <div className="login-container">
        <div className="login-image"></div>
        <div className="login-form">
            <h1 className="logo">AGAR</h1>
            <h2 className="tagline">Log in to unlock the best of <span className="highlight">BOOKISH.</span></h2>
            <form onSubmit={handleSubmit}>
                <label>Email *</label>
                <input type="email" name="email" onChange={handleChange} required />
                <button type="submit" className="login-button">Reset</button>
            </form>
            <p>{error}</p>
        </div>
    </div>
  )
}
