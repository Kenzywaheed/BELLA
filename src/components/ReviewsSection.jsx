import React from 'react';

const reviews = [
  { id: 1, name: 'Eleanor V.', text: 'Bella completely transformed my evening routine. It feels like a spa retreat every single night.', rating: 5 },
  { id: 2, name: 'Sophia R.', text: 'The most luxurious and delicate textures I have ever put on my skin. I feel glowing.', rating: 5 },
  { id: 3, name: 'Mia T.', text: 'Finally, a brand that understands that skincare is about taking a moment to breathe and love yourself.', rating: 5 },
  { id: 4, name: 'Olivia H.', text: 'A gentle reminder to pause and care for myself. The results are just as beautiful as the packaging.', rating: 5 },
  { id: 5, name: 'Isabella C.', text: 'Pure confidence in a bottle. I have never felt more comfortable bare-faced.', rating: 5 }
];

function ReviewsSection() {
  return (
    <section className="reviews-section">
      <h2 className="section-title">Loved by You</h2>
      <div className="reviews-carousel-wrapper">
        <div className="reviews-carousel">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="stars">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
              <p className="review-name">— {review.name}</p>
            </div>
          ))}
          {/* Duplicate for infinite scroll effect if needed, or just let it scroll natively */}
          {reviews.map((review) => (
            <div key={`dup-${review.id}`} className="review-card">
              <div className="stars">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
              <p className="review-name">— {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
