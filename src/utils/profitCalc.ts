export default function profitCalc(
  led: string,
  plexi: string,
  cut: string,
  transfeu: string,
  paid: string
): number {
  const costs = [led, plexi, cut, transfeu];
  let total = 0;
  costs.forEach((cost) => (total += parseInt(cost)));
  const profit = parseInt(paid) - total;
  return profit;
}
