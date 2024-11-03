import {body} from 'express-validator'

export const createValidator = [
  body('enabled', 'enabled have to be boolean type.').isBoolean().optional(),
  body('firstName', 'firstName can\'t be Empty.').not().isEmpty(),
  body('lastName', 'lastName can\'t be Empty.').not().isEmpty(),
  body('email', 'Invalid email.').isEmail(),
  body('description', 'description must be string').isString().optional({ nullable: true }),
  body('gender', 'gender must be Alphanumeric').isAlphanumeric().optional({ nullable: true }),
  body('birthDay', 'Invalid birthday').isISO8601().optional({ nullable: true }), // check date is ISOString
  body('password', 'password can not be Empty').not().isEmpty(),
  body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
  body('image', 'image must be url.').isURL().optional({ nullable: true }),
  body('address', 'address must be string').isString().optional({ nullable: true }),
  body('city', 'city must be string').isString().optional({ nullable: true }),
  body('state', 'state must be string').isString().optional({ nullable: true }),
  body('occupation', 'occupation must be string').isString().optional({ nullable: true }),
  body('hobbies', 'hobbies must be string').isString().optional({ nullable: true }),
];

export const updateValidator = [
    body('enabled', 'enabled is boolean.').isBoolean().optional(),
    body('firstName', 'firstName can\'t be Empty.').not().isEmpty().optional({ nullable: true }),
    body('lastName', 'lastName can\'t be Empty.').not().isEmpty().optional({ nullable: true }),
    body('email', 'Invalid email.').isEmail().optional({ nullable: true }),
    body('description', 'description must be string').isString().optional({ nullable: true }),
    body('gender', 'gender must be Alphanumeric').isAlphanumeric().optional({ nullable: true }),
    body('birthDay', 'Invalid birthday').isISO8601().optional({ nullable: true }),
    body('password', 'The minimum password length is 6 characters').isLength({min: 6}).optional({ nullable: true }),
    body('image', 'image must be url.').isURL().optional({ nullable: true }),
    body('address', 'address must be string').isString().optional({ nullable: true }),
    body('city', 'city must be string').isString().optional({ nullable: true }),
    body('state', 'state must be string').isString().optional({ nullable: true }),
    body('occupation', 'occupation must be string').isString().optional({ nullable: true }),
    body('hobbies', 'hobbies must be string').isString().optional({ nullable: true }),
  ];

export const deleteValidator = [
  body('enabled', 'enabled have to be boolean type.').isBoolean().optional(),
  body('firstName', 'firstName can\'t be Empty.').not().isEmpty(),
  body('lastName', 'lastName can\'t be Empty.').not().isEmpty(),
  body('email', 'Invalid email.').isEmail(),
  body('description', 'description must be string').isString().optional({ nullable: true }),
  body('gender', 'gender must be Alphanumeric').isAlphanumeric().optional({ nullable: true }),
  body('birthDay', 'Invalid birthday').isISO8601().optional({ nullable: true }), // check date is ISOString
  body('password', 'password can not be Empty').not().isEmpty(),
  body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
  body('image', 'image must be url.').isURL().optional({ nullable: true }),
  body('address', 'address must be string').isString().optional({ nullable: true }),
  body('city', 'city must be string').isString().optional({ nullable: true }),
  body('state', 'state must be string').isString().optional({ nullable: true }),
  body('occupation', 'occupation must be string').isString().optional({ nullable: true }),
  body('hobbies', 'hobbies must be string').isString().optional({ nullable: true }),
];