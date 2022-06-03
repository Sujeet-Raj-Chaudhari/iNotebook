import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword:""})
  let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },

            body: JSON.stringify({name, email, password})
          });
          const json = await response.json()
          console.log(json);

          if(json.success)
          {
              //save the auth-token and redirect
              localStorage.setItem('token', json.authToken);
              props.showAlert("Account created Successfully", "success")
              navigate("/");
              
          }
          else{
            props.showAlert("Invalid details", "danger")
          }      
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };

  return (
    <div className="container mt-2">
      <h2 className='my-2'>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group my-3">
        <label htmlFor="exampleInputEmail1">Name</label>
        <input type="text" className="form-control" id="name" name="name" onChange = {onChange} aria-describedby="emailHelp" placeholder="Enter email" />
      </div>
      <div className="form-group my-3">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group my-3">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="password"name="password" onChange={onChange} placeholder="Password" minLength={5} required />
      </div>
      <div className="form-group my-3">
        <label htmlFor="exampleInputPassword1">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" onChange={onChange} placeholder="Password" minLength={5} required/>
      </div>
     
      <button type="submit" className="btn btn-primary my-2">Submit</button>
    </form>
    </div>
  )
}

export default SignUp