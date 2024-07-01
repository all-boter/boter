import { fetchWithAuth, ResType, ResTypeNoData } from "./base";

interface ApiConfig {
  streamLogs: string
  editBot: string
  ownedAllBotsStatus: string
  runTempBot: string
}

export const botApi: ApiConfig = {
  streamLogs: '/api/bot/log/',
  runTempBot: '/api/bot/run/temp',
  ownedAllBotsStatus: '/api/bot/owned/allStatus',
  editBot: '/api/bot/edit',
}

interface IEditBot {
  id: string
  params: { [key: string]: any }
}

export async function editBot(args: IEditBot): Promise<ResTypeNoData> {
  const url = `${botApi.editBot}`

  return await fetchWithAuth<any>(url, { data: args }, 'POST');
}

export async function runTempBot(stgId: string, runnerId: string, type: 1 | 2): Promise<ResTypeNoData> {
  const url = `${botApi.runTempBot}?stgId=${stgId}&runnerId=${runnerId}&type=${type}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}

export async function getOwnedAllBotsStatus(): Promise<ResType<string[]>> {
  const url = `${botApi.ownedAllBotsStatus}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}
