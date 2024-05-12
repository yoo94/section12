import './Button.css'

const Button = ({text, type, onclick})=>{
    return(
        <button className={`Button Button_${type}`} onClick={onclick}>{text}</button>
    )
}

export default Button;
