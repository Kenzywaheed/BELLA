import React from 'react';

const policies = [
  {
    id: 1,
    title: 'Pure Ingredients',
    text: 'Carefully selected, high-quality elements that respect your skin.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
  },
  {
    id: 2,
    title: 'Cruelty-Free',
    text: 'Never tested on animals. Beautiful skin with a beautiful conscience.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
  },
  {
    id: 3,
    title: 'Secure Rituals',
    text: 'Safe and secure checkout to protect your peace of mind.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
  },
  {
    id: 4,
    title: '24-Hour Returns',
    text: 'Return your order within 24 hours of receiving it. Contact returns@bellaskincare.com for assistance.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
  }
];

function PolicySection() {
  return (
    <section className="policy-section">
      <h2 className="section-title">The Bella Promise</h2>
      <div className="policy-grid">
        {policies.map((policy) => (
          <div key={policy.id} className="policy-card">
            <div className="policy-icon">{policy.icon}</div>
            <h3 className="policy-title">{policy.title}</h3>
            <p className="policy-text">{policy.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PolicySection;
