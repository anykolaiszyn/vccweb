---
layout: page
title: Square Shop
permalink: /square-shop/
---

<div class="shop-context-banner merchandise-banner">
  🛍️ <strong>MERCHANDISE SHOP</strong> - General Products - Secure Checkout - Separate from Tobacco Shop
</div>

<style>
  .square-shop-section {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 0;
  }

  .coming-soon-card {
    background: var(--vcc-bg-glass);
    border: 2px solid var(--vice-hot-pink);
    border-radius: var(--radius-large);
    padding: 4rem 3rem;
    text-align: center;
    box-shadow: var(--shadow-neon);
    backdrop-filter: blur(20px);
  }

  .coming-soon-card h2 {
    font-size: 2.5rem;
    color: var(--vice-cyan-blue);
    margin-bottom: 1.5rem;
    text-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
  }

  .coming-soon-card p {
    font-size: 1.2rem;
    color: var(--vcc-text-light);
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .square-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin: 3rem 0;
    text-align: left;
  }

  .feature-item {
    background: rgba(255, 20, 147, 0.1);
    padding: 1.5rem;
    border-radius: var(--radius);
    border: 1px solid var(--vice-hot-pink);
  }

  .feature-item h3 {
    color: var(--vice-hot-pink);
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .feature-item p {
    font-size: 1rem;
    margin: 0;
  }

  .cta-section {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid var(--vice-hot-pink);
  }

  .cta-button-disabled {
    background: linear-gradient(135deg, var(--vice-hot-pink) 0%, var(--vice-electric-purple) 100%);
    color: white;
    border: 2px solid var(--vice-cyan-blue);
    padding: 1rem 2.5rem;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: var(--radius);
    cursor: not-allowed;
    opacity: 0.7;
    display: inline-block;
    margin-bottom: 1rem;
  }

  .alternative-cta {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--vice-hot-pink);
  }

  .alternative-cta p {
    color: var(--vcc-text-muted);
    margin-bottom: 1rem;
  }
</style>

<div class="square-shop-section">
  <div class="coming-soon-card">
    <h2>🏪 Square Shop Coming Soon</h2>
    
    <p>
      We're building our complete online store powered by Square! Soon you'll be able to browse our entire catalog, make secure payments, and have premium cigars, pipes, and tobacco delivered straight to your door.
    </p>

    <div class="square-features">
      <div class="feature-item">
        <h3>💳 Secure Checkout</h3>
        <p>Credit & debit card processing via Square</p>
      </div>
      <div class="feature-item">
        <h3>📦 Direct Shipping</h3>
        <p>Products shipped to your location</p>
      </div>
      <div class="feature-item">
        <h3>🔒 Age Verification</h3>
        <p>Integrated ID verification at checkout</p>
      </div>
      <div class="feature-item">
        <h3>📱 Mobile Ready</h3>
        <p>Shop from any device, anywhere</p>
      </div>
    </div>

    <div class="cta-section">
      <button class="cta-button-disabled" disabled>
        Launch Square Store (Coming Soon)
      </button>
      <p style="color: var(--vcc-text-muted); margin-top: 1rem;">
        We're finalizing inventory setup and shipping logistics. Check back soon!
      </p>
    </div>

    <div class="alternative-cta">
      <p><strong>Need tobacco products now?</strong></p>
      <a href="{{ '/tobacco-shop' | relative_url }}" class="btn btn-primary">Browse Tobacco Shop</a>
      <a href="{{ '/contact' | relative_url }}" class="btn btn-secondary">Contact Us Directly</a>
    </div>
  </div>

  <div style="margin-top: 3rem; padding: 2rem; background: rgba(0, 255, 255, 0.1); border-radius: var(--radius); border: 1px solid var(--vice-cyan-blue);">
    <h3 style="color: var(--vice-cyan-blue); margin-top: 0;">What to Expect</h3>
    <ul style="color: var(--vcc-text-light); line-height: 2;">
      <li>Full product catalog with detailed descriptions and images</li>
      <li>Real-time inventory tracking</li>
      <li>Multiple payment options</li>
      <li>Order tracking and notifications</li>
      <li>Customer account management</li>
      <li>Special promotions and member discounts</li>
    </ul>
  </div>
</div>
