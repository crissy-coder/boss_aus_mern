"use client";

import { useEffect, useState } from "react";
import { getServices } from "../../services/api";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then(res => setServices(res.data));
  }, []);

  return (
    <div>
      <h1>Services</h1>

      {services.map((s, i) => (
        <div key={i}>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
