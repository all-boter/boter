import { ResType, ResTypeNoData, fetchWithAuth } from './base'

interface ApiConfig {
  createStg: string
  strateies: string
  deleteStg: string
  createRunner: string
  runners: string
}

const apiConfig: ApiConfig = {
  createStg: '/api/stg/create',
  strateies: '/api/strateies',
  deleteStg: '/api/stg/delete',
  createRunner: '/api/runner/create',
  runners: '/api/runners',
}

export async function createStg(params: { name: string }): Promise<ResTypeNoData> {
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
  enableStopPassword?: boolean
  tradeTypes?: string
  isLazyStart?: boolean
  usedCount?: number
  deletedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

export async function strateies(): Promise<ResType<any>> {
  const url = `${apiConfig.strateies}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}

export async function deleteStg(id: string): Promise<ResTypeNoData> {
  const url = `${apiConfig.deleteStg}`

  return await fetchWithAuth<any>(url, { data: { id } }, 'POST');
}


interface IRegisterRunner {
  name: string;
  token: string;
  machineHash: string;
  machineIp: string;
}

export interface IRunner {
    id: string;
    uid: string;
    name: string;
    runnerType: string;
    machineHash: string;
    machineIp: string;
    heartbeatAt: Date;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export async function createRunner(params: IRegisterRunner): Promise<ResTypeNoData> {
  const url = `${apiConfig.createRunner}`

  return await fetchWithAuth<any>(url, { data: params }, 'POST');
}

export async function getRunners(): Promise<ResType<IRunner[]>> {
  const url = `${apiConfig.runners}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}