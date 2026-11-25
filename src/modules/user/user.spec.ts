import { USER_PRIVATE_ATTRIBUTES, withoutPrivateAttributes } from './user';

describe('withoutPrivateAttributes', () => {
  const stored = {
    id: 7,
    email: 'someone@example.test',
    firstName: 'Some',
    password: 'hash',
    resetPasswordToken: 'token',
    resetPasswordExpires: new Date(0),
  };

  it('drops the password hash and the reset fields and keeps the rest', () => {
    expect(withoutPrivateAttributes(stored)).toEqual({
      id: 7,
      email: 'someone@example.test',
      firstName: 'Some',
    });
  });

  it('does not change the object it was given', () => {
    withoutPrivateAttributes(stored);
    expect(stored.password).toBe('hash');
  });

  it('covers every attribute listed as private', () => {
    const result = withoutPrivateAttributes(stored) as Record<string, unknown>;
    for (const attribute of USER_PRIVATE_ATTRIBUTES) {
      expect(result).not.toHaveProperty(attribute);
    }
  });
});
