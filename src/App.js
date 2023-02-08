import './App.css';
import UserList from './UserList';
import { useRef } from 'react';
// useRef를 이용해 새로 추가될 배열의 고유 id 생성



function App() {
  // 이 값이 바뀐다고 해서 컴포넌트가 리렌더링 될 필요가 없으니 useRef를 이용해서 관리
  const nextId = useRef(4);

const onCreate = () =>{
  console.log(nextId.current)
  nextId.current += 1;
}
  const users =[
    {
        id:1,
        username:'carllis',
        email:'oterte@naver.com'
    },
    {
        id:2,
        username:'pocket',
        email:'oterte2891@gmail.com'
    },
    {
        id:3,
        username:'Liz',
        email:'liz@example.com'
    }
]

  return (
    <UserList users={users}/>
  );
}

export default App;
