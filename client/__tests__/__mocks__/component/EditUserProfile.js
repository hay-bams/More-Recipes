export const props = {
  editUserProfile: jest.fn(),
  userData: {
    user: {
      email: 'testemail@gmail.com',
      firstName: 'Ayobami',
      lastName: 'Adelakun',
      id: 1
    }
  },
  errorMsg: '',
  match: {
    params: {
      id: '1'
    }
  }
};


