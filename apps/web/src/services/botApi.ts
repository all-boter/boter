import { fetchWithAuth, ResTypeNoData } from "./base";

interface ApiConfig {
  streamLogs: string
  editBot: string
}

export const botApi: ApiConfig = {
  streamLogs: '/api/bot/log/',
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
