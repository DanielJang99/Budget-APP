import React from "react";

// function Button(props) {
//     const id = Number(props.match.params.id);
//     return <button>버튼</button>;
// }

export default function Profile(props) {
    const id = Number(props.match.params.id);
    if (isNaN(id)) {
        return <h1>Profile List</h1>;
    }
    return <h1>Profile List : {id}</h1>;
}
