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
  deleteNotifier: string
  getCandles: string
}

export const botApi: ApiConfig = {
  streamLogs: '/api/bot/log/',
  runTempBot: '/api/bot/run/temp',
  ownedAllBotsStatus: '/api/bot/owned/allStatus',
  editBot: '/api/bot/edit',

  addNotifier: '/api/notifier/add',
  editNotifier: '/api/notifier/edit',
  getNotifierById: '/api/notifier/byId',
  getNotifiers: '/api/notifiers',
  deleteNotifier: '/api/notifier/delete',

  getCandles: '/api/candle/query',
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
  Telegram = 'Telegram',
  Discord = 'Discord',
  Slack = 'Slack',
  Dingtalk = 'Dingtalk',
  Feishu = 'Feishu',
  // Twitter = 'Twitter',
  // Email = 'Email',
}

export interface INotifier {
  id: string;
  uid: string;
  name: string;
  type: NotifierType | null;
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

export async function getNotifiers(): Promise<ResType<INotifier[]>> {
  const url = `${botApi.getNotifiers}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}

export async function addNotifier(args: IAddNotifier): Promise<ResTypeNoData> {
  const url = `${botApi.addNotifier}`

  return await fetchWithAuth<any>(url, { data: args }, 'POST');
}

export async function editNotifier(args: IEditNotifier): Promise<ResTypeNoData> {
  const url = `${botApi.editNotifier}`

  return await fetchWithAuth<any>(url, { data: args }, 'POST');
}

export async function deleteNotifier(notifierId: string): Promise<ResTypeNoData> {
  const url = `${botApi.deleteNotifier}?id=${notifierId}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}
/**
 * Notifier end
 * Notifier end
*/


/**
 * Candle start
 * Candle start
*/
export interface ICandle {
  _id: string;
  period: string;
  openTime: number;
  closeTime: number;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  quoteVolume: number;
  buyVolume: number;
  quoteBuyVolume: number;
}

export type CandleForChart = {
  __typename?: 'Candle';
  close: number;
  high: number;
  low: number;
  open: number;
  symbol?: string;
  time: number;
  volume: number;
};

export enum OperationType {
  Decrease = 'DECREASE',
  Entry = 'ENTRY',
  Exit = 'EXIT',
  Increase = 'INCREASE'
}

export interface ChartConfig {
  /** Whether to display the candlestick chart */
  candle?: boolean;
  /** Trading volume */
  volume?: boolean;
  /** Relative Strength Index (RSI) */
  rsi?: number;
  /** Rate of Change (ROC) */
  roc?: number;
  /** Moving Average (MA) */
  ma?: number[];
  /** Exponential Moving Average (EMA) */
  ema?: number[];
  /** Bollinger Bands (BB) */
  bb?: number[];
  /** Stochastic Oscillator (KDJ) */
  kdj?: number;
}

export async function getCandles(symbol: string, period: string): Promise<ResType<ICandle[]>> {
  const url = `${botApi.getCandles}?symbol=${symbol}&period=${period}`

  return await fetchWithAuth<any>(url, { data: {} }, 'GET');
}

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type Maybe<T> = T | null;

export enum OrderStatus {
  Canceled = 'CANCELED',
  Expired = 'EXPIRED',
  Filled = 'FILLED',
  New = 'NEW',
  PartiallyFilled = 'PARTIALLY_FILLED',
  PendingCancel = 'PENDING_CANCEL',
  Rejected = 'REJECTED'
}

export type IOrder = {
  __typename?: 'Order';
  /** Robot ID */
  botId?: Maybe<Scalars['Int']>;
  /** Exchange custom order ID */
  clientOrderId?: Maybe<Scalars['String']>;
  /** Commission */
  commission?: Maybe<Scalars['Float']>;
  /** Commission asset */
  commissionAsset?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  /** Whether the order is a buy order */
  isBuyer?: Maybe<Scalars['Boolean']>;
  /** Whether the order is a maker order */
  isMaker?: Maybe<Scalars['Boolean']>;
  /** Operation type, e.g., long entry, short entry, long stop loss, etc. */
  operationType?: OperationType;
  /** Order data ID */
  orderDataId?: Maybe<Scalars['String']>;
  /** Exchange order ID */
  orderId?: string | number;
  time: number;
  /** Executed price */
  price?: Maybe<Scalars['Float']>;
  /** Executed quantity */
  qty?: Maybe<Scalars['Float']>;
  /** Executed quote quantity */
  quoteQty?: Maybe<Scalars['Float']>;
  /** Realized profit */
  realizedProfit?: Maybe<Scalars['Float']>;
  /** Trade side */
  side?: Maybe<Scalars['String']>;
  /** Order status */
  status?: Maybe<OrderStatus>;
  /** Trading symbol */
  symbol?: Maybe<Scalars['String']>;
  /** Order type, e.g., market, limit */
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** User ID */
  userId?: Maybe<Scalars['Int']>;
};

/**
 * Candle end
 * Candle end
*/