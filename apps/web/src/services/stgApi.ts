import { ResType, fetchWithAuth } from './base'

interface ApiConfig {
  createStg: string
}

const apiConfig: ApiConfig = {
  createStg: '/api/stg/create',
}

export async function createStg(params: {name: string}): Promise<ResType<any>> {
  const url = `${apiConfig.createStg}`

  return await fetchWithAuth<any>(url, { data: params }, 'POST');
}