import React, {useRef, useState, useMemo, useCallback, useReducer, createContext} from 'react';
// import Hello from './Hello';
// import Wrapper from './Wrapper';
// import Counter from './counter';
// import InputSample from './inputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './UseInputs'

function reducer(state, action) {
  switch(action.type){
      case 'CREATE_USER':
        return {
          inputs: initialState.inputs, 
          users: state.users.concat(action.user)
        };
      case 'TOGGLE_USER':
        return {
          ...state, 
          users: state.users.map(user => user.id === action.id ? {...user, active : !user.active} : user)
        };
      case 'REMOVE_USER':
        return {
          ...state, 
          users: state.users.filter(user => user.id !== action.id)
        }
    default:
      return state;
  }
};

const initialState = {
  users: [
    { 
      id : 1,
      username : "dj990621",
      email: "thekoreanape@naver.com",
      active: true,
    },
    {
      id: 2,
      username: "hsdanjang", 
      email: "hsdanjang@gmail.com",
      active: false,
    },
    {
      id: 3, 
      username: "OMG_arin", 
      email: "arin@gmail.com",
      active: false,

    }
  ]
}

function countActiveUsers(users){
  console.log('Counting active users..');
  return users.filter(user => user.active).length;
}

export const UserDispatch = createContext(null);



function App() {

  const nextID = useRef(4)

  const [state, dispatch] = useReducer(reducer, initialState);
  const {users}= state;

  const [form, onChange, reset] = useInputs({
    username :'', 
    email: '',
  });
  const {username, email} = form;

  
  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id : nextID.current, 
        username, 
        email
      }
    });
    nextID.current +=1 
    reset();
  },[username, email, reset])

 
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value = {dispatch}> 
      <CreateUser username = {username} email = {email} onChange = {onChange} onCreate = {onCreate}/>
      <UserList users={users} />
      <div>활성 사용자 수: {count} </div>
    </UserDispatch.Provider>
  );
}


// function App() {
//   const [inputs, setInputs] = useState({
//     username: '',
//     email: '',
//   });
//   const { username, email} = inputs;

//   const onChange = useCallback(e =>{
//     const {name, value} = e.target;
//     setInputs({
//       ...inputs,
//       [name] : value
//     })
//   }, [inputs]);
// //  함수 안에서 사용하는 상태 혹은 props 가 있다면 꼭, deps 배열안에 포함시켜야 된다. 만약에 deps 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면, 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조 할 것이라고 보장 할 수 없습니다. 


//   const [users, setUsers] =useState([
//     { 
//       id : 1,
//       username : "dj990621",
//       email: "thekoreanape@naver.com",
//       active: true,
//     },
//     {
//       id: 2,
//       username: "hsdanjang", 
//       email: "hsdanjang@gmail.com",
//       active: false,
//     },
//     {
//       id: 3, 
//       username: "OMG_arin", 
//       email: "arin@gmail.com",
//       active: false,

//     }
//   ]);

//   const nextID = useRef(4);

//   const onCreate = useCallback(() => {
//     const user = {
//       id: nextID.current,
//       username, 
//       email,
//     };
//     // setUsers([...users, user]);
//     setUsers(users => users.concat(user));
//     setInputs({
//       username:'',
//       email: ''
//     });
//     nextID.current +=1;
//   }, [username, email]);

//   const onRemove = useCallback(id =>{
//     setUsers(users=> users.filter(user => user.id !== id));
//   },[]);
//   const onToggle = useCallback(id => {
//     setUsers(users=>
//       users.map(user =>
//         user.id === id ? { ...user, active: !user.active } : user
//       )
//     );
//   },[]);

//   const count = useMemo(()=> countActiveUsers(users), [users]); 
//   // useMemo 의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어주면 되고 두번째 파라미터에는 deps 배열을 넣어주면 되는데, 이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고, 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 됩니다.

//   return (
//     <> 
//       {/* <Wrapper>
//         <Hello name = '장현석' color='red' isSpecial={true}/>
//         <Hello color='blue'/>
//       </Wrapper>

//       <Counter /> */}
//       {/* <InputSample /> */}
//       <CreateUser username = {username} email = {email} onChange = {onChange} onCreate = {onCreate} />
//       <UserList users={users} onRemove={onRemove} onToggle = {onToggle} />
//       <div>활성 사용자 수: {count}</div>

//     </>

//   );
// }

export default App;

