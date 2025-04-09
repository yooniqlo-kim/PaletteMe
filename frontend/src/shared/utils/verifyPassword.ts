export function passwordValidation(value: string) {
  const conditions = [
    { regex: /.{8,}/, message: "8글자 이상 입력해주세요" },
    { regex: /[A-Z]/, message: "최소 한 자 이상의 대문자를 입력해주세요" },
    { regex: /[a-z]/, message: "최소 한 자 이상의 소문자를 입력해주세요" },
    { regex: /[0-9]/, message: "최소 한 자 이상의 숫자를 입력해주세요" },
    {
      regex: /[^A-Za-z0-9]/,
      message: "최소 한 자 이상의 특수문자를 입력해주세요",
    },
  ];

  for (let condition of conditions) {
    if (!condition.regex.test(value)) {
      return condition.message;
    }
  }

  return true;
}
