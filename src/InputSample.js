import React, { useState , useRef} from 'react'

export default function InputSample() {
    // 여러개의 문자열을 가지고있는 객체형태의 문자열을 관리해주어야 한다
    const [inputs, setInputs] = useState({
        name:"",
        nickname:""
    })

    // useRef를 담을 객체를 선언한다.
    const nameInput = useRef();

    const {name, nickname} = inputs;
   
    const onChange = (e) => {
      
        const {name,value} = e.target

     
        const nextInputs = {...inputs, [name] : value}
       
        setInputs(nextInputs)

    }
    // useRef가 호출될 곳에서 불러주면 된다.
    const onReset = () => {
        setInputs({
            name:'',
            nickname:''
        })
        // 현재 우리가 선택하고 싶은 DOM이 current
        nameInput.current.focus();
    }
    return (
        <div>
            
            {/* 현재 초기화 버튼을 누르면 포커스가 초기화 버튼에 남아있다. */}
            {/* 포커스를 바꿔주고 싶다면 DOM에 직접 접근해야 한다. */}
            {/* 선언한 useRef객체를 접근하고 싶은 DOM에 ref값으로 넣어주고 */}
            <input name="name" placeholder='이름' onChange={onChange} value={name} ref={nameInput}/>
            <input name="nickname" placeholder='닉네임' onChange={onChange} value={nickname}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} - {nickname}
            </div>
        </div>
    )
}
