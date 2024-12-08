import { useState } from "react";


function Form(){
      const[form,setForm] =useState({
        name:"",
        employeeid:"",
        email:"",
        phone:"",
        department:"",
        date:"",
        role:""
      });
      const [responseMessage, setResponseMessage] = useState("");

      
      const handleChange=(e)=>{
        e.preventDefault();
           const {name,value}=e.target;
           setForm((prevData)=>({
            ...prevData,
            [name]:value,
           })
           )
      }
      async function handleSubmit(e){
         e.preventDefault();
         try{
          const response=await fetch('http://localhost:3001/submit',{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify(form)
          })
          const result=await response.json();
          if(response.ok){
            setResponseMessage(`Success: ${result.message}`);
          }
          else{
            setResponseMessage(`Error: ${result.message}`);
          }
          
         }
      catch(error){
        console.log("An error has occured:"+error);
      }
         setForm(() => ({
            name:"",
            employeeid:"",
            email:"",
            phone:"",
            department:"",
            date:"",
            role:""
          }))
         alert("Form submitted successfully!");
      }
      return(
        <form onSubmit={handleSubmit}>
           <h1>Fill Employee Details</h1>
           <h4>Name:</h4>
            <input type="text"
              name="name"
              value={form.name}
              onChange={(e)=>handleChange(e)}
             />
           <h4>Employee Id:</h4> 
           <input type="text"
                  name="employeeid"
                  value={form.employeeid}
                  onChange={(e)=>handleChange(e)}/>
           <h4>Email:</h4> 
           <input type="email"
                  name="email"
                  value={form.email}
                  onChange={(e)=>handleChange(e)}/>
           <h4>Phone Number:</h4> 
           <input type="text"
               name="phone"
               value={form.phone}
               onChange={(e)=>handleChange(e)}/>
           <h4>Department:</h4>
           <select
             value={form.department}
             onChange={(e)=>handleChange(e)}
             name="department">
             <option value="Marketing">Marketing</option>
             <option value="HR">HR</option>
             <option value="Engineering">Engineering</option>
           </select>
           <h4>Date:</h4> 
           <input type="date"
            name="date"
            value={form.date}
            onChange={(e)=>handleChange(e)}/>
           <h4>Role:</h4> 
           <input type="text"
           name="role"
           value={form.role}
           onChange={(e)=>handleChange(e)}/>
           <button type="submit">Submit</button>
       </form>
      )
}
export default Form;