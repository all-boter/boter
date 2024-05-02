import { ResType, fetchWithAuth } from './base'

interface ApiConfig {
  createStg: string
  strateies: string
}

const apiConfig: ApiConfig = {
  createStg: '/api/stg/create',
  strateies: '/api/strateies',
}

export async function createStg(params: {name: string}): Promise<ResType<any>> {
  const url = `${apiConfig.createStg}`

  return await fetchWithAuth<any>(url, { data: params }, 'POST');
}


export interface IStrategy {
  id: string
  uid: string
  devBotId?: number
  name: string
  intro?: string
  config?: string
  docs?: string
  paramsSchema?: string
  isPublic: boolean
  enableUI?: boolean
  enableTrade?: boolean
  enableStopPassword: boolean
  tradeTypes?: string
  isLazyStart: boolean
  usedCount: number
  deletedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

export async function strateies(): Promise<ResType<any>> {
  const url = `${apiConfig.strateies}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}