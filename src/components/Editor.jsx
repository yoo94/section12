import Button from './Button';
import './Editor.css'
import EmotionItem from './EmotionItem'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {emotionList} from "../util/constants"
import { getStringDate } from '../util/getStirngDate';

const Editor =({onsubmit , initData})=>{
    const nav = useNavigate()

    const [input,setInput] = useState({
        createdDate:new Date(),
        emotionId:3,
        content:""
    });
    const onChangeInput =(e)=>{
        let name = e.target.name;
        let value = e.target.value;

        if(name === 'createdDate') value = new Date(value)
        setInput({
            ...input,
            [name] :value
        })
    }
    const onclickSubmit = ()=>{
        onsubmit(input);
    }

    useEffect(()=>{
        if(initData){
            setInput(
                {
                    ...initData,
                    createdDate:new Date(Number(initData.createdDate))
                }
            ) 
        }
    },[initData])
    

    return (
        <div className="Editor">
            <section className='date_section'>
                <h4>오늘의날짜</h4>
                <input 
                    name="createdDate" 
                    type='date' 
                    value={getStringDate(input.createdDate)}
                    onChange={onChangeInput}
                />
            </section>
            <section className='emotion_section'>
                <h4>오늘의 감정</h4>
                <div  className='emotion_list_wrapper'>
                    {emotionList.map((item)=>{
                        return (
                            <EmotionItem  
                                key={item.emotionId} 
                                {...item} 
                                isSelected={item.emotionId===input.emotionId}
                                onClick={()=>{onChangeInput({
                                    target:{
                                        name:"emotionId",
                                        value:item.emotionId
                                    }
                                })}}
                            /> 
                        )
                    })}
                </div>
            </section>
            <section className='content_section'>
                    <h4>오늘의 일기</h4>
                    <textarea 
                        name='content'
                        value={input.content}
                        onChange={onChangeInput}
                        placeholder='오늘 어땟나용'
                    />
            </section>
            <section className='button_section'>
                    <Button text={'취소하기'} onclick={()=>{nav(-1)}}/>
                    <Button text={'저장하기'} type={'POSITIVE'} onclick={onclickSubmit}/>
            </section>
        </div>
    )
}
export default Editor