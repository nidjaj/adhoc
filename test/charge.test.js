const assert = require('node:assert');
const stripeService = require('../src/services/stripe.service');

describe('Autonomous Payment Service Fix - Issue #1', () => {
  it('should successfully create charge with integer cents', async () => {
    const res = await stripeService.createCharge({
      amountInCents: 5000,
      customerId: 'cus_test999',
      idempotencyKey: 'idemp_key_1'
    });
    assert.strictEqual(res.status, 'succeeded');
    assert.strictEqual(res.amount, 5000);
  });

  it('should reject non-integer or negative cents', async () => {
    await assert.rejects(async () => {
      await stripeService.createCharge({ amountInCents: 49.99, customerId: 'cus_1' });
    }, /Amount must be a positive integer in cents/);
  });
});
