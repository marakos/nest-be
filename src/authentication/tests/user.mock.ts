import { UserSchema } from '../../users/user.schema';

const mockedUser: typeof UserSchema = {
  userId: 1,
  email: 'user@email.com',
  name: 'John',
  password: 'hash',
  phoneNumber: '+48123123123',
  address: {
    id: 1,
    street: 'streetName',
    city: 'cityName',
    country: 'countryName',
  },
  isEmailConfirmed: false,
  isPhoneNumberConfirmed: false,
  isRegisteredWithGoogle: false,
};

export default mockedUser;
