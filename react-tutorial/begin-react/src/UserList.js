import React, {useEffect, useContext} from 'react';
import {UserDispatch} from './App';


const User = React.memo(function User({user}) {
  const {username, email, id, active} = user;

  const dispatch = useContext(UserDispatch);

  // useEffect(() => {
  //   console.log('user 값이 설정됨');
  //   console.log(user);
  //   return () => {
  //     console.log('user 가 바뀌기 전..');
  //     console.log(user);
  //   };
  // }, [user]);
   
  return (
    <div>
      <b style={{
          color: active ? 'green' : 'black',
          cursor: 'pointer'
        }} 
        onClick = {()=> dispatch({
          type: 'TOGGLE_USER', 
          id
        })}>
        {username}
      </b>
      &nbsp;
      <span>({email})</span>
      <button onClick={()=> dispatch({
        type: 'REMOVE_USER',
        id
        })} >
          삭제
        </button>
    </div>

  )
})

function UserList({users}) {
  return (
    <div>
      {
        users.map(
          user => (<User user={user} key = {user.id} />)
        )
      } 
    </div>
  )
};

export default React.memo(UserList);