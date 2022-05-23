export default function profitCalc(
  led: number,
  plexi: number,
  cut: number,
  transfeu: number,
  paid: number
): number {
  const costs = [led, plexi, cut, transfeu];
  let total = 0;
  costs.forEach((cost) => (total += cost));
  const profit = paid - total;
  return profit;
}
