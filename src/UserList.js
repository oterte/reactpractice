import React from 'react'

function User({user}){
        return(
            <div>
                <b>{user.username}</b><span>({user.email})</span>
            </div>
        )
}


export default function UserList(props) {
    // 이 배열을 컴포넌트 엘리먼트 형태로 반환해주면 된다
  return (
    <div>
        {
            props.users.map(
                user => (<User user={user} key={user.id}/>)
            )
        }
    </div>
  )
}
