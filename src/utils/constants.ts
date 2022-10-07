export enum path {
  signUp = '/signUp',
  profile = '/profile',
  forgot = '/forgot',
  checkEmail = '/check-email',
  newPassword = '/set-new-password',
}

export const minPasswordLength = 8;

export const message = `
<div style="background-color: #d2efff ; padding: 15px; font-family: 'Roboto', sans-serif;" >
  <p style='display: inline-block'>Follow this link to change your password :</p>
  <a style='text-decoration: none;' href="http://localhost:3000/set-new-password/$token$">link</a>
</div>`;
