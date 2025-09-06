export const VERIFICATION = {
  OTP_LENGTH: 7,
  ACTION_SRC_KEYS: {
    REGISTER: "register"
  }
}

export const REGISTRATION = {
  SCHEMA_CHAR_LENGTHS: {
    firstName: 2,
    lastName: 2,
    password: 8,
    username: 3
  },

  STEP_QUERY_KEY: "step",
  STEP_QUERY_VALUES: {
    VERIFY: "verify",
  }
}

export const LOGIN = {
  SCHEMA_CHAR_LENGTHS: {
    id: 4,
    password: 8
  },
}

export const RESET = {
  STEP_QUERY_KEY: "step",

  STEP_QUERY_VALUES: {
    VERIFY: "verify",
    RESET: "reset"
  }
}
