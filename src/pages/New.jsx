import Button from "../components/Button";
import Header from "../components/Header";
import Editor  from "../components/Editor"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from '../App';
import useTitle from "../hooks/useTitle";
const New = () => {
    const nav = useNavigate();
    const {onCreate} = useContext(DiaryDispatchContext);
    useTitle("새로 작성")

    const  onsubmit=(input)=>{
        onCreate(
            input.createdDate.getTime()
            ,input.emotionId
            ,input.content
        );
        nav('/',{replace:true})
    }
    return(
        <div>
            <Header title={"새 일기 쓰기"}
                    leftChild={<Button text={"< 뒤로가기"} onclick={()=>{nav(-1)}}/>}
            />
            <Editor onsubmit={onsubmit}/>
        </div>
        
    )
};

export default New