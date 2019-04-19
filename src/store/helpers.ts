import unionize from 'unionize'

export enum UnionTypes {
  STATE = 'state',
  ACTION = 'type'
}

export type CreatorRecord = {
  [tag: string]: {
    [field: string]: any;
  };
}

export function unionCreator<U extends UnionTypes> (type: U) {
  return <A extends CreatorRecord>(actions: A) => {
    return unionize(actions, {
      tag: type,
      value: 'payload'
    })
  }
}
