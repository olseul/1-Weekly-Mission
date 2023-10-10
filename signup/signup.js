import {
  displayError,
  resetErrorMessage,
  togglePasswordVisibility,
} from "/utils/common.js";
import { isValidEmail, isValidPassword } from "/utils/validation.js";
import {
  USERNAME_SELECTOR,
  PASSWORD_SELECTOR,
  PASSWORD_CHECK_SELECTOR,
  LOGIN_BTN_SELECTOR,
  EMAIL_ERROR_TEXT_SELECTOR,
  PASSWORD_ERROR_TEXT_SELECTOR,
  PASSWORD_CHECK_ERROR_TEXT_SELECTOR,
  TOGGLE_VISIBILITY_SELECTOR,
} from "/constants/selector.js";
import ERROR_MESSAGES from "/constants/errorMessages.js";

const {
  EMAIL_EMPTY,
  EMAIL_INVALID,
  EMAIL_TAKEN,
  PASSWORD_EMPTY,
  PASSWORD_MISMATCH,
  PASSWORD_REQUIREMENTS,
} = ERROR_MESSAGES;

// 페이지 접근 시 accessToken 확인하고 있으면 /folder로 이동
if (localStorage.getItem("accessToken")) {
  window.location.href = "/folder";
}

const emailInput = document.querySelector(USERNAME_SELECTOR);
const passwordInput = document.querySelector(PASSWORD_SELECTOR);
const passwordCheckInput = document.querySelector(PASSWORD_CHECK_SELECTOR);
const loginBtn = document.querySelector(LOGIN_BTN_SELECTOR);
const emailErrorText = document.querySelector(EMAIL_ERROR_TEXT_SELECTOR);
const passwordErrorText = document.querySelector(PASSWORD_ERROR_TEXT_SELECTOR);
const passwordCheckErrorText = document.querySelector(
  PASSWORD_CHECK_ERROR_TEXT_SELECTOR
);
const toggleVisibility = document.querySelectorAll(TOGGLE_VISIBILITY_SELECTOR);

async function isEmailTaken(email) {
  try {
    const response = await fetch(
      "https://bootcamp-api.codeit.kr/api/check-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (response.status === 409) {
      return true; // 중복된 이메일
    } else if (response.status === 200) {
      return false; // 중복되지 않은 이메일
    }
  } catch (error) {
    console.error("이메일 중복 체크 에러: ", error);
    return false;
  }
}

async function checkEmailValidity() {
  const email = emailInput.value;
  if (!email) {
    displayError(emailInput, emailErrorText, EMAIL_EMPTY);
    return false;
  } else if (!isValidEmail(email)) {
    displayError(emailInput, emailErrorText, EMAIL_INVALID);
    return false;
  } else if (await isEmailTaken(email)) {
    displayError(emailInput, emailErrorText, EMAIL_TAKEN);
    return false;
  } else {
    resetErrorMessage(emailInput, emailErrorText);
    return true;
  }
}

function checkPasswordValidity() {
  const password = passwordInput.value;
  if (!password) {
    displayError(passwordInput, passwordErrorText, PASSWORD_EMPTY);
    return false;
  } else if (password.length < 8 || !isValidPassword(password)) {
    displayError(passwordInput, passwordErrorText, PASSWORD_REQUIREMENTS);
    return false;
  } else {
    resetErrorMessage(passwordInput, passwordErrorText);
    return true;
  }
}

function checkPasswordMatch() {
  if (passwordInput.value !== passwordCheckInput.value) {
    displayError(passwordCheckInput, passwordCheckErrorText, PASSWORD_MISMATCH);
    return false;
  } else {
    resetErrorMessage(passwordCheckInput, passwordCheckErrorText);
    return true;
  }
}

emailInput.addEventListener("blur", checkEmailValidity);
passwordInput.addEventListener("blur", checkPasswordValidity);
passwordCheckInput.addEventListener("blur", checkPasswordMatch);

loginBtn.addEventListener("click", submitForm);
passwordCheckInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    submitForm();
  }
});

async function submitForm() {
  const isEmailValid = checkEmailValidity();
  const isPasswordValid = checkPasswordValidity();
  const isPasswordMatching = checkPasswordMatch();

  // 유효성 검사를 모두 통과한 경우만 API 요청을 수행
  if (isEmailValid && isPasswordValid && isPasswordMatching) {
    try {
      const response = await fetch(
        "https://bootcamp-api.codeit.kr/api/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value,
          }),
        }
      );

      const responseData = await response.json();

      if (response.status === 200) {
        // 회원가입 성공
        localStorage.setItem("accessToken", responseData.accessToken);
        window.location.href = "/folder";
      }
    } catch (error) {
      console.error("error:", error);
    }
  }
}

toggleVisibility.forEach((icon) => {
  icon.addEventListener("click", function () {
    const inputBox = icon.previousElementSibling;
    togglePasswordVisibility(inputBox, icon);
  });
});
