//-------- Euro to NOK convertion

export function toNok(price) {
  let norwegianCurrencyFormatter = new Intl.NumberFormat("no-NO", {
    style: "currency",
    currency: "NOK",
  });
  return norwegianCurrencyFormatter.format(price * 11.8);
}
