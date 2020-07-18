import React from 'react';

function Wrapper({children}){
  const style = {
    border: '2px solid black',
    padding: 16
  };
  return <div style={style}>{children}</div>
}
// 무조건 children 이여만함. 다른 단어를 넣으면 실행 안됨. 

export default Wrapper;