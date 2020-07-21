import React from "react";
import queryString from "query-string";

export default function About(props) {
    console.log(props.location.search);
    // const params = new URLSearchParams(props.location.search);
    // console.log(params.get("name"));
    const { name } = queryString.parse(props.location.search);
    console.log(name);
    if (name === undefined) {
        return <h1>About : no name </h1>;
    }
    return <h1>About: {name}</h1>;
}
