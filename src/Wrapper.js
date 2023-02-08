import React from 'react'

export default function Wrapper({children}) {
    // 이 컴포넌트가 감싼 내용을 보여주고 싶다면
    // 함수의 매개변수에 children을 넣고
    const style = {
        border : '2px solid black',
        padding: 16
    }
  return (
    // 여기서 렌더링 해주면 된다
    <div style={style}>{children}</div>
  )
}
