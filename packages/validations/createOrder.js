import { z } from 'zod';

/* eslint-disable import/prefer-default-export */
export const createOrderValidationSchema = z.object({
  vendor: z.string({ invalid_type_error: 'Vendor is required' })
    .trim().min(1, { message: 'Vendor is required' })
    .max(50, { message: 'Vendor cannot be more than 50 characters in length' }),
  orderTitle: z.string()
    .trim().min(1, { message: 'Order Title is required' })
    .max(50, { message: 'Order Title cannot be more than 50 characters in length' }),
});
