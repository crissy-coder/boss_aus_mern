"use client";

import { useState } from "react";
import { sendContact } from "../../services/api";

export default function Contact() {

  const [form, setForm] = useState({});

  const submit = async () => {
    await sendContact(form);
    alert("Submitted");
  };

  return (
    <div>
      <h1>Contact</h1>

      <input placeholder="Name" 
        onChange={e => setForm({...form, name: e.target.value})} />

      <input placeholder="Email" 
        onChange={e => setForm({...form, email: e.target.value})} />

      <textarea 
        onChange={e => setForm({...form, message: e.target.value})} />

      <button onClick={submit}>Send</button>
    </div>
  );
}
