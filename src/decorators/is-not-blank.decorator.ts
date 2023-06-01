import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNotBlank(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          const valueTrim = value.replace(/ /g, '');
          if (valueTrim === '') return false;
          return true;
        },
      },
    });
  };
}
