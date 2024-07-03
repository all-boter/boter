import { IJsonValue } from "@/common/constants";
import { fetchWithAuth, ResType, ResTypeNoData } from "./base";

interface ApiConfig {
  streamLogs: string
  editBot: string
  ownedAllBotsStatus: string
  runTempBot: string

  addNotifier: string
  editNotifier: string
  getNotifierById: string
  getNotifiers: string
}

export const botApi: ApiConfig = {
  streamLogs: '/api/bot/log/',
  runTempBot: '/api/bot/run/temp',
  ownedAllBotsStatus: '/api/bot/owned/allStatus',
  editBot: '/api/bot/edit',

  addNotifier: '/notifier/edit',
  editNotifier: '/notifier/add',
  getNotifierById: '/notifier/byId',
  getNotifiers: '/notifiers',
}

interface IEditBot {
  id: string
  params: { [key: string]: any }
}

export async function editBot(args: IEditBot): Promise<ResTypeNoData> {
  const url = `${botApi.editBot}`

  return await fetchWithAuth<any>(url, { data: args }, 'POST');
}

interface IRunTemp {
  stgId: string;
  type: 1 | 2;
  runnerId: string;
  params: { [key: string]: any };
}

export async function runTempBot(args: IRunTemp): Promise<ResTypeNoData> {
  const url = `${botApi.runTempBot}`

  return await fetchWithAuth<any>(url, { data: args }, 'POST');
}

export async function getOwnedAllBotsStatus(): Promise<ResType<string[]>> {
  const url = `${botApi.ownedAllBotsStatus}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}

/**
 * Notifier start
 * Notifier start
*/

export enum NotifierType {
  Twitter = 'Twitter',
  Telegram = 'Telegram',
  Discord = 'Discord',
  Slack = 'Slack',
  Dingtalk = 'Dingtalk',
  Feishu = 'Feishu',
  Email = 'Email',
}

export interface INotifier {
  id: string;
  uid: string;
  name: string;
  type: NotifierType;
  config: IJsonValue;
  description: string;
}

export interface IAddNotifier {
  name: string;
  type: NotifierType;
  config: IJsonValue;
  description: string;
}

export interface IEditNotifier extends IAddNotifier {
  id: string
}

export async function getNotifierById(notifierId: string): Promise<ResType<INotifier>> {
  const url = `${botApi.getNotifierById}?id=${notifierId}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}


export async function getNotifiers(): Promise<ResType<INotifier>> {
  const url = `${botApi.getNotifiers}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}

export async function addNotifier(args: IAddNotifier): Promise<ResTypeNoData> {
  const url = `${botApi.addNotifier}`

  return await fetchWithAuth<any>(url, { data: args }, 'POST');
}

export async function editNotifier(args: IEditNotifier): Promise<ResTypeNoData> {
  const url = `${botApi.editBot}`

  return await fetchWithAuth<any>(url, { data: args }, 'POST');
}
/**
 * Notifier end
 * Notifier end
*/