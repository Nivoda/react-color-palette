const is_hex = /^#?(?:[0-9a-f]{3}){1,2}$/i;

export function validHex(value: string): boolean {
  console.log("it", value);

  return is_hex.test(value);
}
