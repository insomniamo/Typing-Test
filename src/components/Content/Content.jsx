import React from "react";
import TypingTest from "@components/TypingTest/TypingTest.jsx";
import "./Content.scss";

export default function Content({id}){

    return (
        <main className="content">
          <TypingTest />
        </main>
    );
}