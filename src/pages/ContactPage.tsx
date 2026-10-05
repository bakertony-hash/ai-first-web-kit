import { ContactForm } from "../components/ContactForm";
import { contact } from "../content/siteContent";

export function ContactPage() {
  return (
    <div className="subpage">
      <section className="subpage-intro" aria-labelledby="contact-heading">
        <h1 id="contact-heading">Contact</h1>
        <p>
          Questions and reports go to the maintainer as GitHub issues. You can also{" "}
          <a href={contact.issuesUrl}>browse existing issues</a>.
        </p>
      </section>
      <ContactForm />
    </div>
  );
}
