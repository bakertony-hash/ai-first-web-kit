import { contact, webmcpTools } from "../content/siteContent";

const tool = webmcpTools.contactMaintainer;

export function ContactForm() {
  return (
    <section className="section tool-panel" aria-labelledby="contact-form-heading">
      <h2 id="contact-form-heading">Draft a GitHub issue</h2>
      <form
        action={contact.newIssueUrl}
        aria-describedby="contact-form-note"
        method="get"
        tooldescription={tool.description}
        toolname={tool.name}
      >
        {tool.params.map((param) => {
          const id = `contact-${param.name}`;
          const Field = param.name === "body" ? "textarea" : "input";

          return (
            <div className="form-field" key={param.name}>
              <label htmlFor={id}>{param.label}</label>
              <Field id={id} name={param.name} required rows={Field === "textarea" ? 6 : undefined} toolparamdescription={param.description} />
            </div>
          );
        })}
        <p id="contact-form-note">
          Submitting opens a prefilled issue on GitHub. You review it there and submit it yourself. Nothing is sent from
          this page, and a browser agent can fill in the form but can't submit it for you.
        </p>
        <button className="button button-primary" type="submit">
          Open the draft on GitHub
        </button>
      </form>
    </section>
  );
}
