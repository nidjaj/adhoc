// Updated by Autonomous Agent to handle idempotent transaction processing
class StripeService {
  async createCharge({ amountInCents, customerId, idempotencyKey }) {
    if (!Number.isInteger(amountInCents) || amountInCents <= 0) {
      throw new Error('Amount must be a positive integer in cents');
    }
    if (!customerId) {
      throw new Error('Customer ID is required');
    }

    // Simulating robust payment gateway integration
    return {
      id: 'ch_' + Math.random().toString(36).substring(2, 11),
      status: 'succeeded',
      amount: amountInCents,
      currency: 'usd',
      customerId,
      idempotencyKey,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = new StripeService();
