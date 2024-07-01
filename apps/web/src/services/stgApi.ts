import { FormSchema } from '@/components/basics/DynamicFormProvider'
import { ResType, ResTypeNoData, fetchWithAuth } from './base'
import { BotStatus } from '@/common/constants'

interface ApiConfig {
  createStg: string
  strateies: string
  stgById: string
  stgEdit: string
  stgEditParams: string
  deleteStg: string
  createRunner: string
  runners: string
  createBot: string
  getOwnedBots: string
  botById: string
  stopBot: string
  runBot: string
  codeByStgId: string
  editCodeByStgId: string
  testAnyGet: string
}

const apiConfig: ApiConfig = {
  createStg: '/api/stg/create',
  strateies: '/api/strateies',
  stgById: '/api/stg/byId',
  stgEdit: '/api/stg/edit',
  stgEditParams: '/api/stg/paramsEdit',
  deleteStg: '/api/stg/delete',
  createRunner: '/api/runner/create',
  runners: '/api/runners',
  createBot: '/api/bot/create',
  getOwnedBots: '/api/bot/owned',
  botById: '/api/bot/byId',
  stopBot: '/api/bot/stop',
  runBot: '/api/bot/run',
  codeByStgId: '/api/code/byStgId',
  editCodeByStgId: '/api/code/edit',
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

export async function editStg(params: IStrategy): Promise<ResTypeNoData> {
  const url = `${apiConfig.stgEdit}`

  return await fetchWithAuth<any>(url, { data: params }, 'POST');
}

interface IEditParams {
  id: string
  runnerId: string;
  paramsSchema: FormSchema[]
}

export async function stgEditParams(params: IEditParams): Promise<ResTypeNoData> {
  const url = `${apiConfig.stgEditParams}`

  return await fetchWithAuth<any>(url, { data: params }, 'POST');
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
  stgName: string;
  apiKey: string;
  status: BotStatus;
  isPublic: boolean;
  duration: number;
  params: { [key: string]: any }
  backtestParams: { [key: string]: any }
  backtestBotParams: { [key: string]: any }
  storage: { [key: string]: any }
  backtestStatus: string
  stopPassword?: string
  endTime?: Date
  deletedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

export async function getOwnedBots(status: BotStatus): Promise<ResType<Bot[]>> {
  const url = `${apiConfig.getOwnedBots}?status=${status}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}

export async function getStgById(stgId: string): Promise<ResType<IStrategy>> {
  const url = `${apiConfig.stgById}?stgId=${stgId}`

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

export async function getBotById(botId: string): Promise<ResType<Bot>> {
  const url = `${apiConfig.botById}?botId=${botId}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}

interface ICreateBot {
  strategyId: string;
  stgName: string;
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

export enum BotHandleEnum {
  forceStop = 1,
  normal = 2
}

export async function stopBot(botId: string, stopType: BotHandleEnum): Promise<ResType<IRunner[]>> {
  const url = `${apiConfig.stopBot}?botId=${botId}&stopType=${stopType}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}

export interface IRunBot {
  botId: string;
  runnerId: string;
  bot: Bot | null;
  isRestart?: boolean;
}

export async function runBot(params: IRunBot): Promise<ResTypeNoData> {
  const url = `${apiConfig.runBot}`

  return await fetchWithAuth<any>(url, { data: params }, 'POST');
}

interface IServerCode {
  id: string;
  strategyId: string;
  runnerId: string;
  strategyCode: string;
  paramsSchema: IJsonValue[];
  uiCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IJsonValue =
  | string
  | number
  | boolean
  | null
  | IJsonValue[]
  | { [key: string]: IJsonValue };

export async function getCodeByStgId(stgId: string): Promise<ResType<IServerCode>> {
  const url = `${apiConfig.codeByStgId}?stgId=${stgId}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}

export interface EditCodeDto {
  stgId: string;
  code: string;
}

export async function editCodeByStgId(params: EditCodeDto): Promise<ResTypeNoData> {
  const url = `${apiConfig.editCodeByStgId}`

  return await fetchWithAuth<any>(url, { data: params }, 'POST');
}