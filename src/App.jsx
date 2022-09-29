import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0);
  const [next,setNext]=useState(1);
  const [data,setData]=useState([]);
  const [auth,setAuth]=useState(true)
  const handleRight=(()=>{
    setPage((p)=>p+1)
  })
  const handleLeft=(()=>{
    if(next<=1){

    }
    else{
      setNext((p)=>p-1)
    }
  })
  useEffect(()=>{
    axios.get(`http://localhost:8080/books?_limit=6&_page=${next}`).then((res)=>{
        setData(res.data)
    })
  },[next,auth])

  return (
    <div className="App">
      <div className='border-main'>
        <div className='navbar'>
          <button onClick={(()=>{
            setAuth(!auth)
          })} className='login'>{auth==true?"Log In":"Log Out"}</button>
        </div>
        {data.map((e)=>{
          return  <div className='component-1' >
          <div className='book'>
            <h2>{e.name}</h2>
          </div>
          <div className='author'> 
          <i>{e.author}</i>
          </div>
          <div className='price'>
            <div>{auth==false? <div>{e.price} </div> :""} </div>
          </div>
          <div></div>
       </div>
        })}
        <div className='buttons'>
          <button className='left' disabled={next==1} onClick={(()=>{
            setNext(next-1)
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          })}>Left</button>
          <button className='right'  disabled={next==2} onClick={(()=>{
            setNext(next+1)
            document.body.scrollTop = 0;
            
           document.documentElement.scrollTop = 0;
          })}>Right</button>
        </div>
      </div>
    </div>
  )
}

export default App
