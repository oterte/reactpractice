import './App.css';
import UserList from './UserList';
import { useRef, useState } from 'react';
import CreateUser from './CreateUser';
// useRef를 이용해 새로 추가될 배열의 고유 id 생성



function App() {
   // 이 값이 바뀐다고 해서 컴포넌트가 리렌더링 될 필요가 없으니 useRef를 이용해서 관리
   const nextId = useRef(4);

  const [inputs, setInputs] = useState({
    username:'',
    email:'',
  })
//input 태그의 입력값을 담을 객체 생성
  const {username, email} = inputs

// input 태그의 입력값을 가져와서 그 값을 관리
const onChange = (e) => {
  const {name, value} = e.target;
  setInputs({
    ...inputs,
    [name] : value
  })
}

// 이 배열을 컴포넌트의 상태로서 관리하기
  const [users,setUsers] =useState([
    {
        id:1,
        username:'carllis',
        email:'oterte@naver.com',
        active:true
    },
    {
        id:2,
        username:'pocket',
        email:'oterte2891@gmail.com',
        active:true
    },
    {
        id:3,
        username:'Liz',
        email:'liz@example.com',
        active:false
    }
])
const onCreate = () =>{
  // 새로운 유저객체 만들기
  // 이 객체가 기존 항목에 추가될 것
  const newUser = {
    id:nextId.current,
    // username과 email은 const {username, email} = inputs이 가리키는 것
    username,
    email,
  }
  // 스프레드 연산자를 이용하여 불변성을 지키면서 새로운 배열을 만들어 새 항목 추가하기
  // 객체 형태가 아닌 배열 형태로 넣어줘야 한다.
  setUsers([
    ...users,
    newUser
  ]
    
  )
  // 버튼이 클릭 될때 인풋 값 비워주기
  setInputs({
    username:'',
    email:''
  })

  nextId.current += 1;
}
// 배열에서 특정 아이템 삭제 기능 구현
// 불변성을 지켜야 하기 때문에 filter 함수 사용
// 배열에서 특정 조건을 만족하는 원소만 추출하여 새로운 배열 반환
const onRemove = (id) =>{
  // users배열의 각 아이템들을 파라미터로 받아온 id와 비교하여
  // 만약 조건에 만족한다면 새로운 배열에 넣고, 아니라면 넣지 않고
  setUsers(users.filter(user => user.id !== id))
}
// 배열에서 특정 값 수정하기
// active 값을 반전시키기 위해
// 불변성을 지키면서 배열을 업데이트 할때엔 map() 사용
// 전체 배열 중, id가 일치하면 업데이트, 일치하지 않는다면 그대로 둔다.
// user.id가 파라미터로 가져온 id를 비교할건데,
// 불변성을 지켜주기 위해 user객체에 스프레드 연산자 사용
// 호출할때마다 반전, 일치하지 않는다면 기존값 사용
const onToggle = id => {
  setUsers(users.map(
    user=>user.id === id 
    ?{...user,active:!user.active}
    :user
  ));
}

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
    </>
  );
}

export default App;
