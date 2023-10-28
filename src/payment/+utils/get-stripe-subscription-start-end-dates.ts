export function getStripeSubscriptionStartEndDates(subscription: any) {
  const periodStart = new Date(subscription.current_period_start * 1000);
  const periodEnd = new Date(subscription.current_period_end * 1000);

  return { periodStart, periodEnd };
}
