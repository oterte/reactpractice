import React from 'react'

export default function Hello({ name, color, isSpecial}) {


    return (

        <div style={{
            color: color
        }}>
            {/* 삼항 연산자를 이용해 isSpecial 값이 true면 별을, 아니면 null을 */}
            {isSpecial ? <b>*</b> : null}
            안녕하세요 {name}
        </div>
    )
}
