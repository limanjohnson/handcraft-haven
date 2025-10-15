// app/components/ProductReviewsWrapper.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import ProductReviews from './ProductReview';

export default function ProductReviewsWrapper({ productId }: { productId: number }) {
  return (
    <SessionProvider>
      <ProductReviews productId={productId} />
    </SessionProvider>
  );
}
