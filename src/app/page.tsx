"use client";
import React, { useState } from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { authClient } from "@/lib/auth-client"; 

export default function Home() {
  const {data:session} = authClient.useSession();

  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const onSubmit=()=>{
    authClient.signUp.email({
      email,
      password,
      name,
    },{
      onError: () => {
        window.alert("Error creating user:");
      },
      onSuccess:()=>{
        window.alert("User created successfully!");
        
      }
    })
  }

  const onLogin=()=>{
    authClient.signIn.email({
      email,
      password,
    },{
      onError: () => {
        window.alert("Error creating user:");
      },
      onSuccess:()=>{
        window.alert("User created successfully!");
        
      }
    })
  }

  if (session) {
    return (
      <div className="p-4 flex flex-col gap-4">
        <p>Welcome, {session.user.name}</p>
        <Button onClick={()=>authClient.signOut()} className="bg-red-500 text-white p-2 rounded">Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-4">
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={onLogin} className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </div>
    </div>
    
  );
}