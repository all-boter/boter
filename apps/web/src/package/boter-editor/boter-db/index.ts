import Dexie, { Table } from 'dexie'

export interface IRepository {
  source_id: string;
  authorId: string;
  title: string;
  entry: string;
  template: string;
  updated_at: string;
}

export interface IDirectory {
  id: string;
  title: string;
  shortid: string;
  source_id: string;
  directory_shortid: string | null;
  inserted_at: string;
  updated_at: string;

  // github file system
  fullPath?: string
}

export interface IModule {
  code: string;
  id: string;
  is_binary: boolean;
  title: string;
  shortid: string;
  source_id: string;
  directory_shortid: string | null;
  inserted_at: string;
  updated_at: string;

  // github file system
  fullPath?: string
}

export class BoterCodeDb extends Dexie {
  repositories!: Table<IRepository>;
  directories!: Table<IDirectory>;
  modules!: Table<IModule>;

  constructor() {
    super('BoterCode');

    this.version(1).stores({
      repositories: 'source_id, authorId, title, entry, template, updated_at',
      directories: 'id, title, shortid, source_id, directory_shortid, inserted_at, updated_at',
      modules: 'id, code, is_binary, title, shortid, source_id, directory_shortid, inserted_at, updated_at'
    });
  }
}

export const boterCodeDb = new BoterCodeDb();