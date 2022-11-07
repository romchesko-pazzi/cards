import { InitStateType } from '../../store/reducers/PacksReducer';

export enum path {
  signUp = '/signUp',
  profile = '/profile',
  forgot = '/forgot',
  checkEmail = '/check-email',
  newPassword = '/set-new-password',
  packsList = '/packs-list',
  cardsList = '/cards-list',
  learn = '/learn',
  notFound = '/not-found',
}

export enum sortingPacksMethods {
  ASC_USER_NAME = '1user_name',
  DES_USER_NAME = '0user_name',
  ASC_NAME = '1name',
  DES_NAME = '0name',
  ASC_CARDS_COUNT = '1cardsCount',
  DES_CARDS_COUNT = '0cardsCount',
  ASC_UPDATE = '1updated',
  DES_UPDATE = '0updated',
}

export enum sortingCardsMethods {
  ASC_GRADE = '1grade',
  DES_GRADE = '0grade',
  ASC_UPDATE = '1updated',
  DES_UPDATE = '0updated',
}

export const minPasswordLength = 8;

export const message = `
<div style="background-color: #d2efff ; padding: 15px; font-family: 'Roboto', sans-serif;" >
  <p style='display: inline-block'>Follow this link to change your password :</p>
  <a style='text-decoration: none;' href="http://localhost:3000/set-new-password/$token$">link</a>
</div>`;

export const packsCaptions: { id: string; label: string }[] = [
  { id: '1', label: 'Name' },
  { id: '2', label: 'Cards' },
  { id: '3', label: 'Last Updated' },
  { id: '4', label: 'Created by' },
];
export const cardsCaptions: { id: string; label: string }[] = [
  { id: '5', label: 'Question' },
  { id: '6', label: 'Answer' },
  { id: '7', label: 'Last Updated' },
  { id: '8', label: 'Grade' },
];

export const emptyQueryParams: InitStateType['queryParams'] = {
  pageCount: 5,
  sortPacks: sortingPacksMethods.DES_UPDATE,
  user_id: '',
  packName: '',
  min: 0,
  max: 0,
  page: 1,
};
