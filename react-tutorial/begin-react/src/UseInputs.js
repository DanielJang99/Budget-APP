import { useState, useCallback, useReducer} from 'react';

function reducer(state, action){
  switch(action.type){
    case 'on_Change':
      return {
        ...state, 
        [action.name] : action.value,
      };
    case 'reset':
      return Object.keys(state).reduce((acc, cur)=>{
        acc[cur] = '';
        return acc;
      }, {});
    default:
      return state;
  }
};

function useInputs(initialForm){

  const [form, dispatch] = useReducer(reducer, initialForm);

  const onChange = useCallback(e=>{
    const {name, value} = e.target;
    dispatch({
      type: 'on_Change',
      name, 
      value
    });
  }, [])

  const reset = useCallback(()=>{
    dispatch({
      type: 'reset', 
    })
  }, [])
  return [form, onChange, reset]


  // const [form, setForm] = useState(initalForm);

  // const onChange = useCallback(e => {
  //   const {name, value} = e.target;
  //   setForm(form=> ({...form, [name] : value}));
  // }, []);

  // const reset = useCallback(()=> setForm(initalForm), [initalForm])

  // return [form, onChange, reset]


  
};

export default useInputs;  