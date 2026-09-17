import Icon from './Icon';

export default function About({ settings }) {
  const text = settings.about_text;
  if (!text) return null;

  return (
    <section className="section">
      <div className="container-narrow">
        <div className="card d-flex flex-column flex-md-row gap-4 p-4 p-md-5">
          <div className="icon-box icon-box--purple" style={{ width: 56, height: 56, borderRadius: 16 }}>
            <Icon name="briefcase" size={26} />
          </div>
          <div>
            <h2 className="section-title" style={{ fontSize: 24, marginBottom: 14 }}>
              Chi sono
            </h2>
            {text.split('\n').filter(Boolean).map((paragraph, index) => (
              <p key={index} style={{ marginBottom: 10 }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
