const initState: InitStateType = {
  isLoggedIn: false,
  isEmailSent: false,
  isPasswordSet: false,
};

export const AuthReducer = (
  state = initState,
  action: AuthActionsType,
): InitStateType => {
  switch (action.type) {
    case 'AUTH/IS-LOGIN':
    case 'AUTH/SENT-EMAIL':
    case 'AUTH/SET-PASSWORD':
      return { ...state, ...action.payload };
    default: {
      return state;
    }
  }
};

export const setIsLogin = (isLoggedIn: boolean) => {
  return {
    type: 'AUTH/IS-LOGIN',
    payload: { isLoggedIn },
  } as const;
};

export const sentEmail = (isEmailSent: boolean) => {
  return {
    type: 'AUTH/SENT-EMAIL',
    payload: { isEmailSent },
  } as const;
};

export const setPassword = (isPasswordSet: boolean) => {
  return {
    type: 'AUTH/SET-PASSWORD',
    payload: { isPasswordSet },
  } as const;
};

type InitStateType = {
  isLoggedIn: boolean;
  isEmailSent: boolean;
  isPasswordSet: boolean;
};
export type AuthActionsType = SetIsLoginType | SentEmailType | SetPasswordType;
type SetIsLoginType = ReturnType<typeof setIsLogin>;
type SentEmailType = ReturnType<typeof sentEmail>;
type SetPasswordType = ReturnType<typeof setPassword>;
