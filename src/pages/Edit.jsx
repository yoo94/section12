import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext} from '../App';
import { useContext } from "react";
import useDiary from "../hooks/useDiary";

const Edit =()=>{
    const params = useParams();
    const nav = useNavigate()
    const {onDelete,onUpdate} = useContext(DiaryDispatchContext);

    const curDiaryItem = useDiary(params.id)

    const onclickDelete = ()=>{
        if(window.confirm("일기 정말 삭제 ㄱ?")){
            onDelete(params.id)
            nav('/',{replace:true})
        }
    }

    const onSubmit =(input)=>{
        if(window.confirm('정말 수정?')){
            onUpdate(
                params.id,
                input.createdDate.getTime(),
                input.emotionId,
                input.content
            )
        }
        nav('/',{replace:true})
    }
    return (
        <div>
            <Header 
                title={'일기 수정하기'}
                leftChild={<Button onclick={()=>{nav(-1)}} text={"< 뒤로가기"}/>}
                rightChild={<Button onclick={onclickDelete} text={"삭제하기"} type={"NEGATIVE"}/>}
            />
            <Editor initData={curDiaryItem} onsubmit={onSubmit}/>
        </div>
    )
}
export default Edit ;