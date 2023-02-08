# 리액트 기능 실습

1. Props를 통해 값 전달하기
- 부모 컴포넌트에서 자식 컴포넌트로 값을 전달하여 그 값을 사용하는 것
- 넘겨주고 싶은 속성 명을 적어서 그 값과 함께 props라는 객체를 넘겨준다.
- 넘겨받은 props는 함수의 매개변수로 들어가게 되고 props 객체가 생성된다
- 사용하고 싶은 props의 속성 명을 호출하여 사용한다.

```javascript
// 부모 컴포넌트 영역
function App() {
  return (
    <div className="App">
      {/* 넘겨주고 싶은 속성 명을 적어서 그 값과 함께 넘겨준다. */}
     <Hello name="Sara"/>
    </div>
  );
}
// 자식 컴포넌트 영역
export default function Hello(props) {
    // 넘겨받은 props라는 함수의 매개변수로 들어가게 되고
   
  return (
    // 사용하고 싶은 props의 속성 명을 호출하여 사용한다.
    <div>안녕하세요 {props.name}</div>
  )
}

// 자식 컴포넌트 영역을 구조분해 할당으로 구현
export default function Hello({name,color}) {
    // 부모 컴포넌트에서 보낸 값을 자식 컴포넌트의 매개변수로 넣어주는것
  return (
    <div style={{
        color:color
    }}>안녕하세요 {name}</div>
  )
}
```
2. Props Children

```javascript
function App() {
  return (
    // Hello 컴포넌트를 렌더링 해도 브라우저에서 나타나지 않는다.
    // 이 내용을 보여주고 싶다면 props.children을 사용하면 된다.
    <Wrapper>
       {/* 넘겨주고 싶은 속성 명을 적어서 그 값과 함께 props라는 객체를 넘겨준다. */}
      <Hello name="Sara" color="red"/>
    </Wrapper>
  );
}

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
```

3. 조건부 렌더링<br>
특정 조건에 따라 다른 결과를 보여주게 하는 것

```javascript
function App() {
  return (
    <Wrapper>
      <Hello name="Sara" color="red" isSpecial={true}/>
      <Hello name="Sara" color="red" isSpecial={false}/>
    </Wrapper>
  );
}


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
```

4. useState를 통한 동적 상태 관리<br>
React Hooks를 통해 함수형 컴포넌트에서 보여주는 내용이 사용자의 상호작용에 따라 바뀌게 되는 것<br>
버튼을 누르면 숫자가 바뀌는 카운터 예제를 만들어서 실습

```javascript
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
```

5. 리액트에서 input 상태 관리하기

```javascript
export default function InputSample() {

    const [text, setText] = useState('')

    // 리액트에서 input 상태 관리하기
    // 여기서 e 객체의 의미는
    // 수정 이벤트가 발생했을때, 그 이벤트의 내용을 파라미터로 받아오는 것
    const onChange = (e) => {
        // e.target이라는 값은 그 이벤트가 발생한 DOM에 대한 정보를 가지고 있다.
        // e.target.value는 그 이벤트가 발생한 DOM의 값을 의미
        setText(e.target.value)
    }
    // input값 초기화
    const onReset = () => {
        setText('')
    }
  return (
    <div>
        {/* value값을 설정해 줘야 초기화를 누르고 input을 바꿧을때도 input의 값이 비워지게 됨 */}
        <input onChange={onChange} value={text}/>
        <button onClick={onReset}>초기화</button>
        <div>
            <b>값: </b>
            {text}
        </div>
    </div>
  )
}
```

6. 그렇다면 input이 여러개일때는 어떻게 관리하나?<br>
객체 상태를 업데이트해주어야 한다. 기존의 상태를 한번 복사하고 나서 특정 값을 덮어씌우고 새로운 상태를 설정해 주어야 한다.<br>
즉 불변성을 지켜주어야 필요한 렌더링이 발생하게 된다.

```javascript
export default function InputSample() {
    // 여러개의 문자열을 가지고있는 객체형태의 문자열을 관리해주어야 한다
    const [inputs, setInputs] = useState({
        name:"",
        nickname:""
    })
    const {name, nickname} = inputs;
   
    const onChange = (e) => {
        // name값과 value값을 추출
        const {name,value} = e.target

        // 리액트에서 객체를 업데이트하는 방법
        // 먼저 기존의 객체를 복사한다
        // 그 후 특정 값을 덮어씌운다
        // 이 name이 무엇을 가리키고 있냐에 따라 다른 키값이 변경된다
        const nextInputs = {...inputs, [name] : value}
        
        // 이렇게 만들어진 새로운 객체를 새로운 상태로 쓰면 된다.
        setInputs(nextInputs)

    }

    const onReset = () => {
        setInputs({
            name:'',
            nickname:''
        })
    }
    return (
        <div>
            {/* 여러개의 input을 관리하는 방법 */}
            {/* input에 name이라는 값을 설정하여 그 값을 참조하는것 */}
            <input name="name" placeholder='이름' onChange={onChange} value={name}/>
            <input name="nickname" placeholder='닉네임' onChange={onChange} value={nickname}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} - {nickname}
            </div>
        </div>
    )
}
```

7. useRef로 특정 DOM 선택하기<br>
우리가 html과 js를 이용해서 dom을 선택할 땐 getElementById나 document.querySelector를 이용해서 선택한다.<br>
React에서는 DOM을 선택할 때 useRef라는 Hook을 이용하여 선택한다.<br>
- useRef를 담을 객체를 선언한다.
- 선언한 useRef객체를 접근하고 싶은 DOM에 ref값으로 넣어주고
- useRef가 호출될 곳에서 불러주면 된다.
```javascript
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

```

8. 배열 렌더링하기

```javascript
function User({user}){
        return(
            <div>
                <b>{user.username}</b><span>({user.email})</span>
            </div>
        )
}


export default function UserList() {
    // 이 배열을 컴포넌트 엘리먼트 형태로 반환해주면 된다
    // 반환해줄 땐 map 함수룰 이용 하여 반환
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
    <div>
        {
            users.map(
                // key 값이 있어야 정확히 어떤 element를 가리키는지 알 수 있다.
                // 즉 키를 설정해야 효율적으로 렌더링을 할수있다.
                user => (<User user={user} key={user.id}/>)
            )
        }
    </div>
  )
}
```
9. useRef로 컴포넌트 안의 변수 만들기<br>
useRef는 특정 DOM을 선택할때 사용하지만, 특정 값을 기억하여 관리할때도 사용할 수 있다.<br>
주로 setTimeout, setInterval의 id, 외부 라이브러리를 사용하여 생성된 인스턴스, Scroll 위치 등을 관리할때 사용된다.<br>
주의할 점은, useRef로 관리하는 값은 컴포넌트가 리렌더링 되더라도 바뀌지 않는다.<br>
즉, 값이 바뀌어도 리렌더링 될 필요가 없는 값을 관리할때 useRef를 사용하면 된다.
```javascript
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
```