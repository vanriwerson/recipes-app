function validEmail(email) {
  const re = /^(\w+)@[a-z]+(\.[a-z]+){1,2}$/i;
  return re.test(email);
}
export default validEmail;
