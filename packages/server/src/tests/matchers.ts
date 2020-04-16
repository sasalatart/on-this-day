import { Document, Error, Model } from 'mongoose';
import _ from 'lodash';

type MatcherResult = {
  pass: boolean;
  message: () => string;
};

type KindOrMessage = { kind?: string; message?: string };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toFailValidation(
        path: string,
        kindOrMessage: KindOrMessage,
      ): Promise<CustomMatcherResult>;

      toBeRequiredFor(
        MongooseModel: Model<Document>,
      ): Promise<CustomMatcherResult>;

      toBeBetween(
        min: number,
        max: number,
        MongooseModel: Model<Document>,
      ): Promise<CustomMatcherResult>;

      toFailEnumFor(
        value: string,
        MongooseModel: Model<Document>,
      ): Promise<CustomMatcherResult>;
    }
  }
}

async function hasError(
  instance: Document,
  path: string,
  { kind, message }: KindOrMessage,
): Promise<boolean> {
  let pass = false;

  await instance.validate().catch((err: Error.ValidationError) => {
    const pathErr = _.get(err.errors, path);

    if (!pathErr) return;

    if (kind) {
      pass = pathErr.kind === kind;
      return;
    }

    if (message) {
      pass = pathErr.message === message;
      return;
    }

    pass = true;
  });

  return pass;
}

async function toFailValidation(
  this: jest.MatcherContext,
  instance: Document,
  path: string,
  { kind, message }: KindOrMessage,
): Promise<MatcherResult> {
  return {
    pass: await hasError(instance, path, { kind, message }),
    message: (): string => {
      const connector = this.isNot ? ' not ' : ' ';
      const baseMessage = `expected ${instance.modelName} to${connector}fail validation on path ${path}`;

      if (!kind && !message) return baseMessage;
      if (kind) return `${baseMessage} (kind: ${kind})`;
      return `${baseMessage} (message: ${message})`;
    },
  };
}

expect.extend({
  toFailValidation,
  toBeRequiredFor(path: string, MongooseModel: Model<Document>) {
    const instance = new MongooseModel();
    _.set(instance, path, null);
    return toFailValidation.bind(this)(instance, path, { kind: 'required' });
  },
  async toBeBetween(
    this: jest.MatcherContext,
    path: string,
    min: number,
    max: number,
    MongooseModel: Model<Document>,
  ) {
    const failedMin = new MongooseModel({ [path]: min - 1 });
    const failedMax = new MongooseModel({ [path]: max + 1 });
    const validMin = new MongooseModel({ [path]: min });
    const validMax = new MongooseModel({ [path]: max });

    const checks = await Promise.all([
      hasError(failedMin, path, { kind: 'min' }),
      hasError(failedMax, path, { kind: 'max' }),
      hasError(validMin, path, { kind: 'min' }).then((res) => !res),
      hasError(validMax, path, { kind: 'max' }).then((res) => !res),
    ]);

    const connector = this.isNot ? ' not ' : ' ';
    return {
      pass: checks.every((check) => check === true),
      message: (): string => {
        return `expected ${MongooseModel.modelName}.${path} to${connector}be between ${min} and ${max}`;
      },
    };
  },
  toFailEnumFor(path: string, value: string, MongooseModel: Model<Document>) {
    const instance = new MongooseModel();
    _.set(instance, path, value);
    return toFailValidation.bind(this)(instance, path, { kind: 'enum' });
  },
});
