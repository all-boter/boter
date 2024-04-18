import { IDirectory, IModule, IRepository, boterCodeDb } from ".";

export const getRepositoriesBySourceId = async (sourceId: string): Promise<IRepository[]> => {
  try {
    return await boterCodeDb.repositories.where('source_id').equals(sourceId).toArray();
  } catch (error) {
    return []
  }
}

export const getRepositoryBySourceId = async (sourceId: string): Promise<IRepository | undefined> => {
  try {
    return await boterCodeDb.repositories.where('source_id').equals(sourceId).first();
  } catch (error) {
    return undefined;
  }
};

export const getDirectoriesById = async (id: string): Promise<IDirectory | undefined> => {
  try {
    return await boterCodeDb.directories.where('id').equals(id).first();
  } catch (error) {
    return undefined
  }
}

export const getModuleById = async (id: string): Promise<IModule | undefined> => {
  try {
    return await boterCodeDb.modules.where('id').equals(id).first();
  } catch (error) {
    return undefined
  }
}

export async function addRepository(repository: IRepository): Promise<void> {
  try {
    const id = await boterCodeDb.repositories.add(repository);
  } catch (error) {
    console.error('addRepository error', error)
  }
}