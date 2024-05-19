
import axios from 'axios'
import moment from 'moment'
import { Address } from 'viem'

export const stringify: typeof JSON.stringify = (value, replacer, space) =>
  JSON.stringify(
    value,
    (key, value_) => {
      const value = typeof value_ === 'bigint' ? value_.toString() : value_
      return typeof replacer === 'function' ? replacer(key, value) : value
    },
    space,
  )

export const commafy = (num: number) => {
  if (!num) {
    return 0
  }

  var str = num.toString().split('.')
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  }
  if (str[1] && str[1].length >= 4) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ')
  }
  return str.join('.')
}

export const getTimeDifference = (startTimestamp: number, endTimestamp: number) => {
  const diff = Math.abs(endTimestamp - startTimestamp)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(diff / (1000 * 60 * 60) % 24)
  const minutes = Math.floor(diff / (1000 * 60) % 60)
  const seconds = Math.floor(diff / (1000) % 60)

  return { days, hours, minutes, seconds }
}

export const getTotalStakedPercent = async () => {
  const today = moment()
  const yesterday = moment()
  yesterday.subtract(1, 'day')
  const { data: { data: { stakes: stakesOfTodayBSC } } } = await axios.post('https://api.thegraph.com/subgraphs/name/ursaardev/yaystaking-v2', {
    query: `{
      stakes(
          where: {
              timestamp_gte: ${today.startOf('day').unix()},
              timestamp_lte: ${today.endOf('day').unix()}
          }
      ) {
          id
          user
          amount
          timestamp
      }
    }`,
  })
  const { data: { data: { stakes: stakesOfYesterdayBSC } } } = await axios.post('https://api.thegraph.com/subgraphs/name/ursaardev/yaystaking-v2', {
    query: `{
      stakes(
          where: {
              timestamp_gte: ${yesterday.startOf('day').unix()},
              timestamp_lte: ${yesterday.endOf('day').unix()}
          }
      ) {
          id
          user
          amount
          timestamp
      }
    }`,
  })
  const { data: { data: { stakes: stakesOfTodayAVAX } } } = await axios.post('https://api.thegraph.com/subgraphs/name/ursaardev/yaystaking-v2-avax', {
    query: `{
      stakes(
          where: {
              timestamp_gte: ${today.startOf('day').unix()},
              timestamp_lte: ${today.endOf('day').unix()}
          }
      ) {
          id
          user
          amount
          timestamp
      }
    }`,
  })
  const { data: { data: { stakes: stakesOfYesterdayAVAX } } } = await axios.post('https://api.thegraph.com/subgraphs/name/ursaardev/yaystaking-v2-avax', {
    query: `{
      stakes(
          where: {
              timestamp_gte: ${yesterday.startOf('day').unix()},
              timestamp_lte: ${yesterday.endOf('day').unix()}
          }
      ) {
          id
          user
          amount
          timestamp
      }
    }`,
  })

  return { stakesOfTodayBSC, stakesOfYesterdayBSC, stakesOfTodayAVAX, stakesOfYesterdayAVAX }
}

export const getMyStakings = async (address: Address) => {
  const { data: { data: { stakes: mystakingBSC } } } = await axios.post('https://api.thegraph.com/subgraphs/name/ursaardev/yaystaking-v2', {
    query: `{
      stakes(
        where: {
          user: "${address}"
        }
      ) {
        id
        user
        amount
        timestamp
      }
    }`,
  })
  const { data: { data: { stakes: mystakingAVAX } } } = await axios.post('https://api.thegraph.com/subgraphs/name/ursaardev/yaystaking-v2-avax', {
    query: `{
      stakes(
        where: {
          user: "${address}"
        }
      ) {
        id
        user
        amount
        timestamp
      }
    }`,
  })

  return { mystakingBSC, mystakingAVAX }
}