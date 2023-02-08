import React,{useState}from 'react'

export default function Counter() {
    // number라는 상태로 만들고 그 기본값은 0으로 하겟다.
    // setNumber는 그 상태를 바꿔주는 함수
    const [number, setNumber] = useState(0)

    const onIncrease = () =>{
        setNumber(number +1)
        
    }
    const onDecrease = () =>{
        setNumber(number -1)
    }
  return (
    <div>
        <h1>{number}</h1>
        {/* 이벤트 호출 시, 함수 이름을 적어주는거지 함수를 호출하는것이 아님 */}
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
    </div>
  )
}
