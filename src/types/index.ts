export enum FieldType {
  TEXT = 'TEXT',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
  NUMBER = 'NUMBER',
}

export interface Field {
  id: string;
  name: string;
  type: string;
  value?: string | number | boolean;
}
