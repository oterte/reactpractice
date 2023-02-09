import React from 'react'

function User({user, onRemove,onToggle}){
    // 같은 user.이 반복되는게 싫다면 값을 추출해서 사용해주면 된다.
    const {username, email, id , active} = user
        return(
            <div>
                <b style={{
                    // active값이 true라면 green, 아니라면 black
                    color: active ? 'green' : 'black',
                    cursor:'pointer'
                }}
                    onClick={() => {onToggle(id)}}
                >{username}</b><span>({email})</span>
                {/* 삭제를 하고 싶은데, user.id값을 넣어서 호출해주고 싶다면 */}
                {/* 새로운 함수를 만들어 파라미터를 넣는다 */}
                {/* 이 버튼이 눌렷을때, 이 함수를 호출하고, 
                이 함수에서는 props로 받아온 onRemove를 id값을 받아서 호출해준다. */}
                {/* 즉, id가 특정 값인것을 삭제하겠다. */}
                <button onClick={() => onRemove(id)}>삭제</button>
            </div>
        )
}


export default function UserList({users, onRemove, onToggle}) {
    console.log(users)
  return (
    <div>
        {
            users.map(
                user => (
                    <User 
                    user={user} 
                    key={user.id} 
                    onRemove={onRemove}
                    onToggle={onToggle}/>)
            )
        }
    </div>
  )
}
