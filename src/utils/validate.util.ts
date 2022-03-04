const is_hex = /^#?(?:[0-9a-f]{3}){1,2}$/i;

export function validHex(value: string): boolean {
  console.log(is_hex.test(value), "is_hex.test(value);");

  return is_hex.test(value);
}

// const hex = /[0-9A-F]/i;

// export function validHex(value: string): boolean {
//   if (value.startsWith("#")) {
//     value = value.slice(1);

//     return hex.test(value[value.length - 1]);
//   }

//   return (/\w/i.test(value) && !/\d/.test(value)) || value === "";
// }
