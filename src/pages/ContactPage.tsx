import { ContactPanel } from "../components/ContactPanel";

export function ContactPage() {
  return (
    <div className="subpage">
      <section className="subpage-intro" aria-labelledby="contact-heading">
        <h1 id="contact-heading">Contact</h1>
        <p>Use this route when an agent or human needs a stable maintainer contact path.</p>
      </section>
      <ContactPanel />
    </div>
  );
}
