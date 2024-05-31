import { FormSchema } from '@/components/basics/DynamicFormProvider'
import { ResType, ResTypeNoData, fetchWithAuth } from './base'
import { BotStatus } from '@/common/constants'

interface ApiConfig {
  createStg: string
  strateies: string
  deleteStg: string
  createRunner: string
  runners: string
  createBot: string
  getOwnedBots: string
  stopBot: string
  codeByStgId: string
  testAnyGet: string
}

const apiConfig: ApiConfig = {
  createStg: '/api/stg/create',
  strateies: '/api/strateies',
  deleteStg: '/api/stg/delete',
  createRunner: '/api/runner/create',
  runners: '/api/runners',
  createBot: '/api/bot/create',
  getOwnedBots: '/api/bot/owned',
  stopBot: '/api/bot/stop',
  codeByStgId: '/api/code/byStgId',
  testAnyGet: '/api/test/any/get',
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
  paramsSchema: FormSchema[]
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

export interface Bot {
  id: string;
  uid: string;
  strategyId: string;
  apiId: string;
  name: string;
  apiKey: string;
  status: BotStatus;
  isPublic: boolean;
  duration: number;
  params: { [key: string]: any }
  backtestParams: { [key: string]: any }
  backtestBotParams: { [key: string]: any }
  storage: { [key: string]: any }
  backtestStatus: string
  stopPassword: string
  endTime: Date
  deletedAt: Date
  createdAt: Date
  updatedAt: Date
}

export async function getOwnedBots(status: BotStatus): Promise<ResType<Bot[]>> {
  const url = `${apiConfig.getOwnedBots}?status=${status}`

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

interface ICreateBot {
  strategyId: string;
  name: string;
  params: any;
  apiId?: number;
}

export async function createBot(params: ICreateBot): Promise<ResTypeNoData> {
  const url = `${apiConfig.createBot}`

  return await fetchWithAuth<any>(url, { data: params }, 'POST');
}

export async function testAnyGet(params: any): Promise<ResType<any>> {
  const url = `${apiConfig.testAnyGet}?symbol=${params}`

  return await fetchWithAuth<any>(url, { data: params }, 'GET');
}

export enum StopBotEnum {
  forceStop = 1,
  normalStop = 2
}

export async function stopBot(botId: string, stopType: StopBotEnum): Promise<ResType<IRunner[]>> {
  const url = `${apiConfig.stopBot}?botId=${botId}&stopType=${stopType}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}

interface IServerCode {
  id: string;
  strategyId: string;
  strategyCode: string;
  uiCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getCodeByStgId(stgId: string): Promise<ResType<IServerCode>> {
  const url = `${apiConfig.codeByStgId}?stgId=${stgId}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}
