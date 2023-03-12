export default class Messages {
  public messages = {
    minLength: "{{ field }} must be at least {{ options.minLength }} long",
    maxLength: "{{ field }} must be less then {{ options.maxLength }} long",
    required: "{{ field }} is required",
    hasLowercase: "{{ field }} must contains a lowercase",
    hasUppercase: "{{ field }} must contains an uppercase",
    hasDigit: "{{ field }} must contains a number",
    hasSymbol: "{{ field }} must contains a symbol",
    email: "{{ field }} address is invalid",
    oldPasswordMatch: "{{ field }} does not match with existing password",
  }
}
