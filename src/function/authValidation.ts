const emailRegex =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const authValidation = (email: string, password: string) => {
  const emailValidation = emailRegex.test(email);
  const passwordValidation = password.length < 8;

  if (!emailValidation) {
    alert("Please check your email address");
  } else if (passwordValidation) {
    alert("password must be over 8 letters");
  }

  return emailValidation && !passwordValidation;
};

export default authValidation;
