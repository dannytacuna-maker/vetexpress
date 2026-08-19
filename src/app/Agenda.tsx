"use client";

import { FormEvent, useMemo, useState } from "react";
import { WhatsAppIcon } from "./Icons";

const WHATSAPP = "50379252537";

const services = [
  "Consulta a domicilio",
  "Consulta en clínica",
  "Vacunación y desparasitación",
  "Baño y peluquería",
  "Farmacia / productos",
  "Guardería y hospedaje",
  "Laboratorio",
  "Transporte de mascota",
  "Trámites de exportación",
  "Otro",
];

const zones = ["Santa Tecla", "Merliot", "Clínica Santa Mónica", "Otra zona (coordinar)"];

export function Agenda() {
  const [name, setName] = useState("");
  const [pet, setPet] = useState("");
  const [service, setService] = useState(services[0]);
  const [zone, setZone] = useState(zones[0]);
  const [when, setWhen] = useState("");
  const [note, setNote] = useState("");

  const href = useMemo(() => {
    const lines = [
      "Hola VETEXPRESS, quiero agendar:",
      name ? `Nombre: ${name}` : null,
      pet ? `Mascota: ${pet}` : null,
      `Servicio: ${service}`,
      `Zona / lugar: ${zone}`,
      when ? `Día preferido: ${when}` : null,
      note ? `Notas: ${note}` : null,
    ].filter(Boolean);
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [name, pet, service, zone, when, note]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="vx-phone">
      <div className="vx-phone-bezel">
        <div className="vx-phone-island" />
        <div className="vx-phone-screen">
          <div className="vx-phone-status">
            <span>9:41</span>
            <i />
            <span>5G</span>
          </div>
          <div className="vx-phone-wa">
            <img src="/vetexpress/logo.png" alt="" width={34} height={34} />
            <div>
              <b>VETEXPRESS</b>
              <small>en línea</small>
            </div>
          </div>
          <form className="vx-form" onSubmit={onSubmit}>
            <p className="vx-phone-bubble">Hola, arma el mensaje y lo mandamos por WhatsApp.</p>
            <label className="vx-field">
              <span>Tu nombre</span>
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
            <label className="vx-field">
              <span>Mascota</span>
              <input
                value={pet}
                onChange={(e) => setPet(e.target.value)}
                placeholder="Luna, gata · o Toby, perro"
              />
            </label>
            <label className="vx-field">
              <span>Servicio</span>
              <select value={service} onChange={(e) => setService(e.target.value)}>
                {services.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="vx-field">
              <span>Zona</span>
              <select value={zone} onChange={(e) => setZone(e.target.value)}>
                {zones.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="vx-field">
              <span>Día preferido</span>
              <input value={when} onChange={(e) => setWhen(e.target.value)} placeholder="sábado en la mañana" />
            </label>
            <label className="vx-field">
              <span>Notas</span>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} />
            </label>
            <button className="vx-phone-send" type="submit">
              <WhatsAppIcon />
              Enviar cita
            </button>
          </form>
          <div className="vx-phone-home" />
        </div>
      </div>
    </div>
  );
}
