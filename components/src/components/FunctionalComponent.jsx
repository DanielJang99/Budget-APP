import React from 'react';

// export default function FunctionalComponent(){
//   return <p>Functional Component</p>
// }

const FunctionalComponent = ({name, age, children, isFemale}) => {
  console.log(name, age, children, isFemale)
  return (
    <>
      <p>Functional Component: 나의 이름은 {name} </p>
      <p>나의 나이는 {age}</p>
    </>

  )
};

// setting default props in functional component 
FunctionalComponent.defaultProps = {
  isFemale : true,
}

export default FunctionalComponent;
