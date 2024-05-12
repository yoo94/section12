import './App.css';
import { Route,Routes, } from 'react-router-dom';
import { useReducer,useRef,createContext, useEffect, useState } from 'react';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import NotFound from './pages/NotFound';


function reducer(state, action){
  let nextState;
  switch(action.type){
    case "INIT": return action.data
    case "CREATE":
      nextState = [action.data, ...state];
      break
    case "UPDATE":
      nextState = state.map((item)=>
        String(item.id) === String(action.data.id) ? action.data : item
      )
      break;
    case "DELETE":
      nextState = state.filter((item)=>
        {return Number(item.id) !== Number(action.id)}
      )  
      break
      default: return state;
  }
  localStorage.setItem("diary",JSON.stringify(nextState))
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {

  const [isLoading,setIsLoading] = useState(true)
  const [data,dispatch] = useReducer(reducer, []);
  const idRef = useRef()

  useEffect(()=>{
    const storedData = localStorage.getItem('diary');
    if(!storedData) {
      setIsLoading(false)
      return;
    }
    const parseData = JSON.parse(storedData);
    let maxId=0;

    if(!Array.isArray(parseData)) {
      setIsLoading(false)
      return;
    }
    parseData.forEach(itm => {
      if(Number(itm.id) > maxId) maxId = Number(itm.id)
    });

    idRef.current = maxId +1;

    dispatch({
      type:'INIT',
      data:parseData
    });
    setIsLoading(false)
  },[])

  const onCreate =(createdDate,emotionId,content)=>{
    dispatch({
      type:"CREATE",
      data : {
        id : idRef.current++,
        createdDate,
        emotionId,
        content
      }
    })
  }
  const onUpdate =(id,createdDate,emotionId,content)=>{
    dispatch(
      {
        type:"UPDATE",
        data : {
          id,
          createdDate,
          emotionId,
          content
        }
      }
    )
  }
  const onDelete =(id)=>{
    dispatch({
      type:"DELETE",
      id
    })
  }
  if(isLoading){
    return <div>로딩중!</div>
  }
  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate,onDelete,onUpdate}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
      
    </>
    
  )
}

export default App
